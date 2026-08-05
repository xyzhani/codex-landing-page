import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'skills', 'xlsx', 'templates'))
from base import *
from openpyxl import Workbook
from openpyxl.styles import PatternFill, Font, Alignment, Border, Side
from openpyxl.utils import get_column_letter

wb = Workbook()
ws = wb.active
ws.title = "LinkedIn Outreach"

# --- Data ---
prospects = [
    {
        "#": 1,
        "name": "Simon Rand",
        "headline": "Founder of KuulSeats.com — Partnering with independent restaurants to grow the largest foodie community",
        "industry": "Restaurant / Food Tech",
        "location": "London, UK",
        "linkedin_url": "https://uk.linkedin.com/in/simon-rand",
        "why_them": "Partners with hundreds of independent restaurants. His entire mission is helping restaurants grow — reviews and social proof are critical for his clients' success. AI Social Reputation automates what his restaurants struggle with most: getting consistent Google reviews and turning them into social content.",
        "pitch": "Hi Simon,\n\nI came across KuulSeats and love what you're building for independent restaurants.\n\nI'm Hanan, founder of AI Social Reputation (https://aisocialreputation.com/). We automate Google review collection via WhatsApp, SMS, or Email — and instantly turn every 5-star review into Instagram Stories, Facebook Posts, and LinkedIn Posts.\n\nYour restaurant partners likely struggle with two things: getting enough Google reviews consistently, and turning those reviews into social media content. We solve both — automatically.\n\nEvery customer interaction → AI-powered review request → Google review → AI reply posted instantly → social media content generated. Zero manual effort from the restaurant owner.\n\nWould love to show you a quick demo. Would you be open to a 10-min chat this week?\n\nBest,\nHanan"
    },
    {
        "#": 2,
        "name": "Hina Mistry",
        "headline": "Award-winning Dental Practice Manager with expertise in prevention, management, and healthcare",
        "industry": "Dental / Healthcare",
        "location": "UK",
        "linkedin_url": "https://uk.linkedin.com/in/hina-mistry-57532548",
        "why_them": "As an award-winning dental practice manager, she directly manages patient experience and the practice's online reputation. Dental practices heavily rely on Google reviews for new patient acquisition. She would benefit from automated review requests after every appointment and AI-powered social content from positive patient experiences.",
        "pitch": "Hi Hina,\n\nI noticed your impressive background in dental practice management — congratulations on the awards!\n\nI'm Hanan, founder of AI Social Reputation (https://aisocialreputation.com/). We help dental practices automate Google review collection. After every appointment, patients automatically receive a review request via WhatsApp, SMS, or Email.\n\nHere's what that looks like:\n1. Patient finishes appointment → automated review request sent\n2. Happy patient leaves a Google review → AI replies instantly with a personalized thank-you\n3. That review becomes an Instagram Story, Facebook Post, or LinkedIn Post — automatically\n\nDental practices we work with see 3-5x more Google reviews within the first month, which directly translates to more new patients.\n\nWould you be open to seeing how it works? Happy to do a quick 10-minute walkthrough.\n\nBest,\nHanan"
    },
    {
        "#": 3,
        "name": "Andrew Heppinstall",
        "headline": "Founder of Unavoidable Marketing — Leeds-based digital marketing agency helping UK and US businesses get found, win leads and grow online",
        "industry": "Digital Marketing Agency",
        "location": "Leeds, UK",
        "linkedin_url": "https://uk.linkedin.com/in/andrew-heppinstall",
        "why_them": "Runs a digital marketing agency serving UK and US businesses. Review management and social media content are core services his clients need. AI Social Reputation could be a powerful tool he offers to his clients as a value-add or resells as a service, creating a new revenue stream for his agency.",
        "pitch": "Hi Andrew,\n\nGreat to connect — Unavoidable Marketing's work with UK and US businesses is really impressive.\n\nI'm Hanan, founder of AI Social Reputation (https://aisocialreputation.com/). We built a SaaS that automates Google review collection via WhatsApp, SMS, or Email, and turns every review into ready-to-post social media content.\n\nI think there's a strong fit with your agency: you could offer this to your clients as a value-add service or even resell it. Imagine telling your clients that every customer interaction automatically generates a Google review + social media posts — with zero manual effort on their end.\n\nKey benefits for your clients:\n- 3-5x more Google reviews (directly impacts local SEO — which I know matters to your clients)\n- AI-written reply to every review within seconds\n- Every review auto-converted to Instagram Story + Facebook Post + LinkedIn Post\n- Multi-channel: WhatsApp, SMS, or Email — whatever the customer prefers\n\nWould you be open to a quick call to explore a partnership? I'd love to show you the platform.\n\nBest,\nHanan"
    },
    {
        "#": 4,
        "name": "Jennifer Donahue",
        "headline": "Owner at Positive Sentiment — Converting hotel shoppers into confirmed guests through online review management",
        "industry": "Hospitality / Hotels",
        "location": "South Carolina, US",
        "linkedin_url": "https://www.linkedin.com/in/jennifer-donahue-61a18b3a",
        "why_them": "She literally manages online reviews and responses for hotels — that's her entire business. AI Social Reputation automates what she does manually: review collection, AI replies, and social media content generation. This could 10x her capacity or become a tool she recommends to all her hotel clients.",
        "pitch": "Hi Jennifer,\n\nYour work at Positive Sentiment really resonated with me — helping hotels convert shoppers through review management is such a critical need in hospitality.\n\nI'm Hanan, founder of AI Social Reputation (https://aisocialreputation.com/). We've built something that I think could be a game-changer for the hotels you work with.\n\nOur platform automates the entire review lifecycle:\n1. After every stay, guests automatically receive a review request via WhatsApp, SMS, or Email\n2. Google reviews come in → AI writes a personalized, on-brand reply within seconds\n3. Every 5-star review is instantly turned into an Instagram Story, Facebook Post, or LinkedIn Post\n\nFor the hotels you manage, this means: more reviews (higher ranking on Google/OTA), faster response times (guest satisfaction), and a steady stream of social content — all on autopilot.\n\nI'd love to explore how this could complement your services. Would you have 10 minutes for a demo this week?\n\nBest,\nHanan"
    },
    {
        "#": 5,
        "name": "Ryan Cornelius",
        "headline": "Automotive General Manager who elevated digital reputation, improving Google reviews from 3.4 to 4.3 stars and BBB rating from D- to A+",
        "industry": "Automotive Dealership",
        "location": "US",
        "linkedin_url": "https://www.linkedin.com/in/ryanecornelius",
        "why_them": "He has a proven track record of improving Google reviews from 3.4 to 4.3 stars — he already understands the massive business value of reputation management. He's the perfect prospect because he's already sold on the 'why' and would immediately see how AI automation could take his results to the next level with less effort.",
        "pitch": "Hi Ryan,\n\nI saw your profile and was genuinely impressed — taking Google reviews from 3.4 to 4.3 and BBB from D- to A+ is no small feat. You clearly understand the business impact of online reputation.\n\nI'm Hanan, founder of AI Social Reputation (https://aisocialreputation.com/). We built a system that automates everything you did manually to achieve those results.\n\nHere's what it does for dealerships:\n- After every sale/service, customers automatically get a review request via WhatsApp, SMS, or Email\n- 5-star reviews go straight to Google with an AI-written personalized reply\n- 1-4 star reviews are caught internally for feedback before they go public\n- Every positive review becomes an instant social media post (Instagram, Facebook, LinkedIn)\n\nYou already proved that reputation drives revenue. Now imagine doing it at scale, across every transaction, without relying on staff to follow up manually.\n\nI'd love to hear about your experience and show you what we've built. Would you be open to a quick conversation?\n\nBest,\nHanan"
    },
]

# --- Sheet setup ---
headers = ["#", "Name", "Headline", "Industry", "Location", "LinkedIn URL", "Why Them", "Personalized Pitch Message"]
num_cols = len(headers)
last_col = num_cols + 1  # starting from B=2

setup_sheet(ws, title="AI Social Reputation — LinkedIn Outreach Targets", last_col=last_col)

# --- Write headers ---
for col_idx, header in enumerate(headers, start=2):
    ws.cell(row=4, column=col_idx, value=header)
style_header_row(ws, row_num=4, col_start=2, col_end=last_col)

# --- Write data ---
for i, p in enumerate(prospects):
    row_num = 5 + i
    values = [p["#"], p["name"], p["headline"], p["industry"], p["location"], p["linkedin_url"], p["why_them"], p["pitch"]]
    for col_idx, value in enumerate(values, start=2):
        cell = ws.cell(row=row_num, column=col_idx, value=value)
    style_data_row(ws, row_num=row_num, col_start=2, col_end=last_col, row_index=i)

# --- Column widths ---
col_widths = {
    2: 5,    # #
    3: 20,   # Name
    4: 45,   # Headline
    5: 22,   # Industry
    6: 18,   # Location
    7: 45,   # LinkedIn URL
    8: 55,   # Why Them
    9: 80,   # Pitch Message
}
for col, width in col_widths.items():
    ws.column_dimensions[get_column_letter(col)].width = width

# --- Row heights for pitch rows (they're long) ---
for i in range(len(prospects)):
    ws.row_dimensions[5 + i].height = 180

# --- Wrap text on long columns ---
for row_num in range(5, 5 + len(prospects)):
    for col_idx in [4, 7, 8, 9]:  # headline, linkedin_url, why_them, pitch
        cell = ws.cell(row=row_num, column=col_idx)
        cell.alignment = Alignment(wrap_text=True, vertical='top', horizontal='left')

# Header wrap text
for col_idx in range(2, last_col + 1):
    ws.cell(row=4, column=col_idx).alignment = Alignment(wrap_text=True, vertical='center', horizontal='center')

# --- Hyperlinks on LinkedIn URLs ---
from openpyxl.styles import Font as XlFont
for i in range(len(prospects)):
    cell = ws.cell(row=5 + i, column=7)
    cell.hyperlink = prospects[i]["linkedin_url"]
    cell.font = XlFont(name=FONT_NAME, size=11, color="0066CC", underline="single")

# Also hyperlink the website in each pitch
# (We keep the URL as plain text in the pitch since it's a message template)

# --- Freeze panes ---
ws.freeze_panes = "C5"  # Freeze # and Name columns + header row

# --- Print setup ---
ws.page_setup.orientation = 'landscape'
ws.page_setup.fitToWidth = 1
ws.page_setup.fitToHeight = 0

# --- Disable grid lines ---
ws.sheet_view.showGridLines = False

# --- Auto-filter ---
ws.auto_filter.ref = f"B4:{get_column_letter(last_col)}{4 + len(prospects)}"

# --- Save ---
output_path = "/home/z/my-project/download/AI_Social_Reputation_LinkedIn_Outreach.xlsx"
os.makedirs(os.path.dirname(output_path), exist_ok=True)
wb.properties.creator = "Z.ai"
wb.save(output_path)
print(f"Saved to: {output_path}")