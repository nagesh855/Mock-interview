"""Offline PDF certificate generation using fpdf2."""
from datetime import datetime
from fpdf import FPDF

class CertificatePDF(FPDF):
    """Custom PDF class for certificate layout."""

    def draw_certificate_borders(self):
        """Draw decorative double border in Navy Blue and Gold."""
        self.set_line_width(2.5)
        self.set_draw_color(26, 54, 93)  # Navy Blue #1A365D
        self.rect(8, 8, 281, 194)

        self.set_line_width(0.8)
        self.set_draw_color(212, 175, 55)  # Gold #D4AF37
        self.rect(12, 12, 273, 186)

def generate_certificate_pdf(
    student_name: str,
    category_name: str,
    level: str,
    score: float,
    certificate_code: str,
    issued_at: datetime = None
) -> bytes:
    """Generate high-resolution landscape certificate as raw PDF bytes."""
    if issued_at is None:
        issued_at = datetime.now()

    date_str = issued_at.strftime("%B %d, %Y")

    pdf = CertificatePDF(orientation="L", unit="mm", format="A4")
    pdf.add_page()
    pdf.draw_certificate_borders()

    # 1. Header Emblem / Watermark
    pdf.set_y(22)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(212, 175, 55)  # Gold
    pdf.cell(0, 6, "OFFLINE-FIRST AI CREDENTIAL", align="C", new_x="LMARGIN", new_y="NEXT")

    # 2. Main Title
    pdf.set_font("Helvetica", "B", 24)
    pdf.set_text_color(26, 54, 93)  # Navy
    pdf.cell(0, 12, "CERTIFICATE OF ACHIEVEMENT", align="C", new_x="LMARGIN", new_y="NEXT")

    pdf.set_font("Helvetica", "I", 10)
    pdf.set_text_color(100, 116, 139)  # Slate gray
    pdf.cell(0, 5, "PRACTICE ANYWHERE, LEARN ANYTIME AND FACE ANY INTERVIEW WITH STRONG CONFIDENCE", align="C", new_x="LMARGIN", new_y="NEXT")

    # 3. Presentation line
    pdf.ln(8)
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(0, 7, "This is proudly presented to", align="C", new_x="LMARGIN", new_y="NEXT")

    # 4. Student Name
    pdf.ln(2)
    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(15, 23, 42)  # Dark slate
    pdf.cell(0, 11, student_name, align="C", new_x="LMARGIN", new_y="NEXT")

    # 5. Description
    pdf.ln(3)
    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(0, 6, "for demonstrating verified competence in the competitive examination track:", align="C", new_x="LMARGIN", new_y="NEXT")

    # 6. Category & Level
    pdf.ln(2)
    pdf.set_font("Helvetica", "B", 16)
    pdf.set_text_color(26, 54, 93)
    level_formatted = level.capitalize()
    pdf.cell(0, 8, f"{category_name} ({level_formatted} Level)", align="C", new_x="LMARGIN", new_y="NEXT")

    # 7. Score Badge
    pdf.ln(2)
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(16, 185, 129)  # Emerald Green
    pdf.cell(0, 6, f"FINAL EVALUATED PROFICIENCY SCORE: {score:.1f}%", align="C", new_x="LMARGIN", new_y="NEXT")

    # 8. Footer Metadata
    pdf.set_y(155)
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(100, 116, 139)

    # Left: Issued Date
    pdf.set_x(25)
    pdf.cell(80, 5, f"Date of Issue: {date_str}", align="L")

    # Center: Evaluation Method
    pdf.set_x(105)
    pdf.cell(85, 5, "Evaluation: 60% Content + 40% Delivery", align="C")

    # Right: Unique Certificate Code
    pdf.set_x(190)
    pdf.cell(80, 5, f"Certificate Code: {certificate_code}", align="R")

    # Sign-off line
    pdf.set_y(172)
    pdf.set_line_width(0.4)
    pdf.set_draw_color(203, 213, 225)
    pdf.line(25, 172, 95, 172)
    pdf.line(200, 172, 270, 172)

    pdf.set_y(174)
    pdf.set_font("Helvetica", "I", 9)
    pdf.set_x(25)
    pdf.cell(70, 5, "AI Mock Interview Evaluation System", align="C")

    pdf.set_x(200)
    pdf.cell(70, 5, "Official Verification Seal", align="C")

    return bytes(pdf.output())
