/**
 * IndexedDB Service for AI Mock Interview Practice
 * Database Name: ai_mock_interview_db
 * Schema Version: 1
 *
 * Object Stores:
 * 1. interviewQuestions: id (keyPath), indexes: category, difficulty, language, category_language, category_diff_lang
 * 2. interviewSessions: id (keyPath), indexes: category, status, startedAt
 * 3. interviewAnswers: id (keyPath), indexes: sessionId, questionId, savedAt
 * 4. userProgress: id (keyPath), indexes: category, updatedAt
 */

export const DB_NAME = 'ai_mock_interview_db';
export const DB_VERSION = 1;

export const STORES = {
  QUESTIONS: 'interviewQuestions',
  SESSIONS: 'interviewSessions',
  ANSWERS: 'interviewAnswers',
  PROGRESS: 'userProgress'
};

/**
 * Open the native IndexedDB database, handling version upgrades and store/index creation.
 * @returns {Promise<IDBDatabase>}
 */
export function openDB() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB is not supported or available in this environment.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // 1. interviewQuestions store
      if (!db.objectStoreNames.contains(STORES.QUESTIONS)) {
        const questionsStore = db.createObjectStore(STORES.QUESTIONS, { keyPath: 'id' });
        questionsStore.createIndex('category', 'category', { unique: false });
        questionsStore.createIndex('difficulty', 'difficulty', { unique: false });
        questionsStore.createIndex('language', 'language', { unique: false });
        questionsStore.createIndex('category_language', ['category', 'language'], { unique: false });
        questionsStore.createIndex('category_diff_lang', ['category', 'difficulty', 'language'], { unique: false });
      }

      // 2. interviewSessions store
      if (!db.objectStoreNames.contains(STORES.SESSIONS)) {
        const sessionsStore = db.createObjectStore(STORES.SESSIONS, { keyPath: 'id' });
        sessionsStore.createIndex('category', 'category', { unique: false });
        sessionsStore.createIndex('status', 'status', { unique: false });
        sessionsStore.createIndex('startedAt', 'startedAt', { unique: false });
      }

      // 3. interviewAnswers store
      if (!db.objectStoreNames.contains(STORES.ANSWERS)) {
        const answersStore = db.createObjectStore(STORES.ANSWERS, { keyPath: 'id' });
        answersStore.createIndex('sessionId', 'sessionId', { unique: false });
        answersStore.createIndex('questionId', 'questionId', { unique: false });
        answersStore.createIndex('savedAt', 'savedAt', { unique: false });
      }

      // 4. userProgress store
      if (!db.objectStoreNames.contains(STORES.PROGRESS)) {
        const progressStore = db.createObjectStore(STORES.PROGRESS, { keyPath: 'id' });
        progressStore.createIndex('category', 'category', { unique: false });
        progressStore.createIndex('updatedAt', 'updatedAt', { unique: false });
      }
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error || new Error('Failed to open IndexedDB'));
    };

    request.onblocked = () => {
      console.warn('IndexedDB database open request blocked by another open tab/connection.');
    };
  });
}

/**
 * Execute a transaction on specified stores.
 * @param {string|string[]} storeNames
 * @param {'readonly'|'readwrite'} mode
 * @param {Function} callback (stores, transaction) => Promise|any
 * @returns {Promise<any>}
 */
export async function withTransaction(storeNames, mode, callback) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeNames, mode);
    const stores = Array.isArray(storeNames)
      ? storeNames.map((name) => tx.objectStore(name))
      : tx.objectStore(storeNames);

    let result;
    tx.oncomplete = () => {
      db.close();
      resolve(result);
    };

    tx.onerror = () => {
      db.close();
      reject(tx.error || new Error('Transaction failed'));
    };

    tx.onabort = () => {
      db.close();
      reject(tx.error || new Error('Transaction aborted'));
    };

    try {
      result = callback(stores, tx);
    } catch (err) {
      db.close();
      reject(err);
    }
  });
}

/**
 * Seed initial questions into IndexedDB idempotently.
 * Checks for existing question IDs before inserting to prevent duplicate records on repeated opens.
 * Uses a single atomic transaction and direct queuing within getAllKeys callback.
 * @param {Array<Object>} initialQuestions
 * @returns {Promise<{ insertedCount: number, existingCount: number, totalCount: number }>}
 */
export async function initAndSeedQuestions(initialQuestions) {
  if (!initialQuestions || !Array.isArray(initialQuestions) || initialQuestions.length === 0) {
    return { insertedCount: 0, existingCount: 0, totalCount: 0 };
  }

  const db = await openDB();
  return new Promise((resolve, reject) => {
    let isSettled = false;
    const safeResolve = (val) => {
      if (!isSettled) {
        isSettled = true;
        try {
          db.close();
        } catch {
          // ignore close error if already closed
        }
        resolve(val);
      }
    };
    const safeReject = (err) => {
      if (!isSettled) {
        isSettled = true;
        try {
          db.close();
        } catch {
          // ignore close error if already closed
        }
        reject(err);
      }
    };

    const tx = db.transaction(STORES.QUESTIONS, 'readwrite');
    const store = tx.objectStore(STORES.QUESTIONS);

    let insertedCount = 0;
    let existingCount = 0;
    let totalCount = 0;

    // Single non-nested request to fetch all currently existing question keys
    const getAllKeysReq = store.getAllKeys();

    getAllKeysReq.onsuccess = () => {
      const existingKeys = new Set(getAllKeysReq.result || []);

      // Queue put operations directly in this turn of the event loop
      initialQuestions.forEach((q) => {
        if (!existingKeys.has(q.id)) {
          store.put(q);
          insertedCount++;
        } else {
          existingCount++;
        }
      });

      totalCount = existingKeys.size + insertedCount;
    };

    getAllKeysReq.onerror = () => {
      safeReject(getAllKeysReq.error || new Error('Failed to retrieve question keys from IndexedDB'));
    };

    tx.oncomplete = () => {
      safeResolve({
        insertedCount,
        existingCount,
        totalCount
      });
    };

    tx.onerror = () => {
      safeReject(tx.error || new Error('Transaction error during question seeding'));
    };

    tx.onabort = () => {
      safeReject(tx.error || new Error('Transaction aborted during question seeding'));
    };
  });
}

/**
 * Add or update questions in bulk.
 * @param {Array<Object>} questions
 * @returns {Promise<number>} Number of questions processed
 */
export async function addQuestions(questions) {
  if (!Array.isArray(questions) || questions.length === 0) return 0;
  return withTransaction(STORES.QUESTIONS, 'readwrite', (store) => {
    questions.forEach((q) => store.put(q));
    return questions.length;
  });
}

/**
 * Retrieve questions filtered by category, and optionally language and difficulty.
 * @param {string} category
 * @param {string} [language]
 * @param {string} [difficulty]
 * @returns {Promise<Array<Object>>}
 */
export async function getQuestionsByCategory(category, language, difficulty) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.QUESTIONS, 'readonly');
    const store = tx.objectStore(STORES.QUESTIONS);
    const results = [];

    let request;
    if (category && difficulty && language) {
      const index = store.index('category_diff_lang');
      request = index.openCursor(IDBKeyRange.only([category, difficulty, language]));
    } else if (category && language) {
      const index = store.index('category_language');
      request = index.openCursor(IDBKeyRange.only([category, language]));
    } else if (category) {
      const index = store.index('category');
      request = index.openCursor(IDBKeyRange.only(category));
    } else {
      request = store.openCursor();
    }

    request.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        db.close();
        resolve(results);
      }
    };

    request.onerror = () => {
      db.close();
      reject(request.error || new Error('Failed to fetch questions by category'));
    };
  });
}

/**
 * Retrieve questions filtered by language.
 * @param {string} language ('en', 'te', 'hi')
 * @returns {Promise<Array<Object>>}
 */
export async function getQuestionsByLanguage(language) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.QUESTIONS, 'readonly');
    const store = tx.objectStore(STORES.QUESTIONS);
    const index = store.index('language');
    const results = [];

    const request = index.openCursor(IDBKeyRange.only(language));

    request.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        db.close();
        resolve(results);
      }
    };

    request.onerror = () => {
      db.close();
      reject(request.error || new Error('Failed to fetch questions by language'));
    };
  });
}

/**
 * Get all questions stored in local IndexedDB.
 * @returns {Promise<Array<Object>>}
 */
export async function getAllQuestions() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.QUESTIONS, 'readonly');
    const store = tx.objectStore(STORES.QUESTIONS);
    const request = store.getAll();

    request.onsuccess = () => {
      db.close();
      resolve(request.result || []);
    };

    request.onerror = () => {
      db.close();
      reject(request.error || new Error('Failed to fetch all questions'));
    };
  });
}

/**
 * Save or update an interview session.
 * @param {Object} session
 * @returns {Promise<Object>} The saved session record
 */
export async function saveInterviewSession(session) {
  if (!session || !session.id) {
    throw new Error('Interview session must have a unique id.');
  }

  const record = {
    ...session,
    updatedAt: new Date().toISOString()
  };

  await withTransaction(STORES.SESSIONS, 'readwrite', (store) => {
    store.put(record);
  });

  return record;
}

/**
 * Retrieve an interview session by ID.
 * @param {string} sessionId
 * @returns {Promise<Object|null>}
 */
export async function getInterviewSession(sessionId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.SESSIONS, 'readonly');
    const store = tx.objectStore(STORES.SESSIONS);
    const request = store.get(sessionId);

    request.onsuccess = () => {
      db.close();
      resolve(request.result || null);
    };

    request.onerror = () => {
      db.close();
      reject(request.error || new Error(`Failed to fetch session ${sessionId}`));
    };
  });
}

/**
 * Retrieve interview history sessions ordered by creation/started time.
 * @param {number} [limit=50]
 * @returns {Promise<Array<Object>>}
 */
export async function getInterviewHistory(limit = 50) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.SESSIONS, 'readonly');
    const store = tx.objectStore(STORES.SESSIONS);
    const results = [];

    // Open cursor in reverse (prev) direction if startedAt index exists
    const index = store.index('startedAt');
    const request = index.openCursor(null, 'prev');

    request.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor && results.length < limit) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        db.close();
        resolve(results);
      }
    };

    request.onerror = () => {
      db.close();
      reject(request.error || new Error('Failed to fetch interview history'));
    };
  });
}

/**
 * Save an interview answer for a question in a session.
 * @param {Object} answer
 * @returns {Promise<Object>}
 */
export async function saveInterviewAnswer(answer) {
  if (!answer || !answer.id || !answer.sessionId || !answer.questionId) {
    throw new Error('Answer record must have id, sessionId, and questionId.');
  }

  const record = {
    ...answer,
    savedAt: answer.savedAt || new Date().toISOString()
  };

  await withTransaction(STORES.ANSWERS, 'readwrite', (store) => {
    store.put(record);
  });

  return record;
}

/**
 * Retrieve all answers belonging to a session.
 * @param {string} sessionId
 * @returns {Promise<Array<Object>>}
 */
export async function getInterviewAnswers(sessionId) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.ANSWERS, 'readonly');
    const store = tx.objectStore(STORES.ANSWERS);
    const index = store.index('sessionId');
    const results = [];

    const request = index.openCursor(IDBKeyRange.only(sessionId));

    request.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        results.push(cursor.value);
        cursor.continue();
      } else {
        db.close();
        resolve(results);
      }
    };

    request.onerror = () => {
      db.close();
      reject(request.error || new Error(`Failed to fetch answers for session ${sessionId}`));
    };
  });
}

/**
 * Save user progress record for a category.
 * @param {Object} progress
 * @returns {Promise<Object>}
 */
export async function saveUserProgress(progress) {
  if (!progress || !progress.id) {
    throw new Error('User progress record must have an id (e.g. category id or user-category key).');
  }

  const record = {
    ...progress,
    updatedAt: new Date().toISOString()
  };

  await withTransaction(STORES.PROGRESS, 'readwrite', (store) => {
    store.put(record);
  });

  return record;
}

/**
 * Retrieve user progress for a category or overall.
 * @param {string} category
 * @returns {Promise<Object|null>}
 */
export async function getUserProgress(category) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.PROGRESS, 'readonly');
    const store = tx.objectStore(STORES.PROGRESS);
    const request = store.get(category);

    request.onsuccess = () => {
      db.close();
      resolve(request.result || null);
    };

    request.onerror = () => {
      db.close();
      reject(request.error || new Error(`Failed to fetch user progress for ${category}`));
    };
  });
}

/**
 * Update user progress counters upon completing or starting a session.
 * @param {string} category
 * @param {{ sessionIncrement?: number, questionsIncrement?: number }} [delta]
 * @returns {Promise<Object>}
 */
export async function updateUserProgress(category, delta = {}) {
  const current = (await getUserProgress(category)) || {
    id: category,
    category,
    completedSessions: 0,
    totalQuestions: 0,
    lastPracticedAt: null
  };

  const updated = {
    ...current,
    completedSessions: current.completedSessions + (delta.sessionIncrement || 1),
    totalQuestions: current.totalQuestions + (delta.questionsIncrement || 0),
    lastPracticedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return saveUserProgress(updated);
}

/**
 * Delete a specific record from an object store by key.
 * @param {string} storeName
 * @param {string|number} id
 * @returns {Promise<boolean>}
 */
export async function deleteRecord(storeName, id) {
  return withTransaction(storeName, 'readwrite', (store) => {
    store.delete(id);
    return true;
  });
}

/**
 * Clear all records in an object store.
 * @param {string} storeName
 * @returns {Promise<boolean>}
 */
export async function clearStore(storeName) {
  return withTransaction(storeName, 'readwrite', (store) => {
    store.clear();
    return true;
  });
}
