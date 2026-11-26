"""Deterministic scoring engine: 60% content + 40% delivery."""
import re
from typing import Dict, Any, List

COMMON_FILLER_WORDS = [
    "um", "uh", "like", "you know", "actually", "basically",
    "literally", "sort of", "kind of", "i mean", "so yeah"
]

class DeterministicScorer:
    """Evaluates interview responses deterministically without paid cloud AI."""

    @staticmethod
    def analyze_delivery(text: str, duration_seconds: float = 30.0) -> Dict[str, Any]:
        """Analyze speech delivery: pace (WPM), filler words, fluency."""
        words = re.findall(r"\b\w+\b", text.lower())
        word_count = len(words)
        minutes = max(duration_seconds / 60.0, 0.1)
        wpm = round(word_count / minutes, 1)

        filler_counts: Dict[str, int] = {}
        total_fillers = 0
        text_lower = text.lower()
        for filler in COMMON_FILLER_WORDS:
            occurrences = len(re.findall(r"\b" + re.escape(filler) + r"\b", text_lower))
            if occurrences > 0:
                filler_counts[filler] = occurrences
                total_fillers += occurrences

        # Delivery score calculation (max 100)
        # Optimal pace: 110 - 150 WPM
        pace_penalty = 0.0
        if wpm < 90:
            pace_penalty = min((90 - wpm) * 0.5, 30)
        elif wpm > 170:
            pace_penalty = min((wpm - 170) * 0.5, 30)

        # Filler penalty: 5 points per filler up to 40 max
        filler_penalty = min(total_fillers * 5.0, 40.0)

        delivery_score = max(round(100.0 - pace_penalty - filler_penalty, 1), 10.0)

        return {
            "wpm": wpm,
            "word_count": word_count,
            "total_fillers": total_fillers,
            "filler_counts": filler_counts,
            "delivery_score": delivery_score
        }

    @staticmethod
    def analyze_content(user_answer: str, expected_points: str = "") -> Dict[str, Any]:
        """Analyze content relevance and keyword coverage (60% weight)."""
        if not expected_points:
            return {"content_score": 75.0, "matched_points": [], "missed_points": []}

        # Expected points can be comma-separated or words
        points = [p.strip().lower() for p in re.split(r"[,;]", expected_points) if p.strip()]
        if not points:
            return {"content_score": 75.0, "matched_points": [], "missed_points": []}

        answer_lower = user_answer.lower()
        matched = []
        missed = []

        for p in points:
            if p in answer_lower:
                matched.append(p)
            else:
                missed.append(p)

        match_ratio = len(matched) / len(points)
        content_score = round(match_ratio * 100.0, 1)

        return {
            "content_score": max(content_score, 20.0),
            "matched_points": matched,
            "missed_points": missed
        }

    @classmethod
    def evaluate_response(
        cls,
        user_answer: str,
        expected_points: str = "",
        duration_seconds: float = 30.0
    ) -> Dict[str, Any]:
        """Full deterministic evaluation combining 60% Content + 40% Delivery."""
        delivery = cls.analyze_delivery(user_answer, duration_seconds)
        content = cls.analyze_content(user_answer, expected_points)

        final_score = round((content["content_score"] * 0.6) + (delivery["delivery_score"] * 0.4), 1)

        suggestions = []
        if delivery["total_fillers"] > 2:
            suggestions.append(f"Reduce filler words like: {', '.join(delivery['filler_counts'].keys())}")
        if delivery["wpm"] < 100:
            suggestions.append("Try to speak a little faster and more confidently.")
        elif delivery["wpm"] > 160:
            suggestions.append("Slow down slightly to articulate your points clearly.")
        if content["missed_points"]:
            suggestions.append(f"Consider including key points: {', '.join(content['missed_points'])}")

        return {
            "score": final_score,
            "content_score": content["content_score"],
            "delivery_score": delivery["delivery_score"],
            "pace_wpm": delivery["wpm"],
            "filler_words_count": delivery["total_fillers"],
            "missed_points": ", ".join(content["missed_points"]),
            "better_suggestion": " | ".join(suggestions) if suggestions else "Good answer! Keep practicing."
        }
