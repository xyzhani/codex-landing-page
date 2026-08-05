import sys, os
XLSX_SKILL_DIR = '/home/z/my-project/skills/xlsx'
for sub in [XLSX_SKILL_DIR, os.path.join(XLSX_SKILL_DIR, 'templates')]:
    if sub not in sys.path:
        sys.path.insert(0, sub)

from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill
from openpyxl.utils import get_column_letter

# --- Prospects data ---
prospects = [
    {
        'name': 'Emily Abrams',
        'title': 'Multi-Location Tanning Salon Owner',
        'company': 'California Tanning Salons',
        'industry': 'Beauty & Wellness',
        'linkedin': 'https://www.linkedin.com/in/emilyrabrams',
        'why': 'Already recognized as one of the highest-rated salon businesses on Yelp. Runs multiple locations — review automation would scale her reputation across all stores effortlessly.',
        'pitch': '''Hi Emily,

I noticed you\'ve built an incredible reputation for your salons — congrats on being one of the highest-rated on Yelp! That doesn\'t happen by accident.

I\'m reaching out because I built something that takes the manual work out of review collection. After every visit, customers automatically get a WhatsApp, SMS, or email asking for a rating. 5-star reviews go straight to Google; anything lower stays private so you can fix it before it goes public.

Then the AI writes a personalized reply to every Google review — instantly.

With multiple locations, you\'d set this up once and it runs on autopilot for all your stores. Would you be open to a 15-minute demo to see how it works?

Best,
[Your Name]
AI Social Reputation''',
        'status': 'Not Contacted',
    },
    {
        'name': 'Steve Zimmerman',
        'title': 'Former Restaurant CEO (Zim\'s Restaurants)',
        'company': 'Restaurant Realty',
        'industry': 'Restaurants & Hospitality',
        'linkedin': 'https://www.linkedin.com/in/restaurantrealty',
        'why': '20+ years in the restaurant industry, led one of the largest restaurant groups. Restaurants live and die by Google reviews — automated review collection is a natural fit.',
        'pitch': '''Hi Steve,

With 20+ years in the restaurant industry, you know better than anyone that Google reviews can make or break a location.

I built an automated system that asks every customer for a review right after their visit — via WhatsApp, SMS, or email. The smart part: 5-star ratings go to Google, and anything lower stays private so you can handle it personally.

Every Google review also gets an AI-written, personalized reply posted instantly. No more falling behind on review responses.

Restaurants using this are seeing 3-5x more reviews per month. Would love to show you how it works — would a quick 15-min demo work for you?

Best,
[Your Name]
AI Social Reputation''',
        'status': 'Not Contacted',
    },
    {
        'name': 'Rebecca Chatham',
        'title': 'Business Broker (Auto Repair / HVAC)',
        'company': 'So-Cal Business Brokerage',
        'industry': 'Business Brokerage',
        'linkedin': 'https://www.linkedin.com/in/rebecca-chatham-68ab83232',
        'why': 'Brokers auto repair shops and HVAC companies — she knows dozens of business owners who need better reviews. Potential partner/referral source or power user.',
        'pitch': '''Hi Rebecca,

I saw you specialize in brokering auto repair and HVAC businesses. Here\'s something I think could add real value to the businesses you work with — and potentially to your own deal flow.

I built a SaaS that automatically collects Google reviews from every customer for service businesses. The business owner doesn\'t have to lift a finger — the system sends the request via WhatsApp/SMS/email after every job, routes 5-star reviews to Google, and keeps negative feedback private.

Why this matters for your sellers: businesses with strong Google reviews sell for higher multiples. It\'s a tangible asset they can build on autopilot.

I\'d love to explore if there\'s a partnership fit — or just show you the demo. Would 15 minutes work?

Best,
[Your Name]
AI Social Reputation''',
        'status': 'Not Contacted',
    },
    {
        'name': 'Marissa Galle',
        'title': 'CEO & Founder, CLICK Real Estate',
        'company': 'CLICK Real Estate',
        'industry': 'Real Estate',
        'linkedin': 'https://www.linkedin.com/in/marissagalle',
        'why': 'Real estate is built on trust and reviews. As a founder/CEO, she understands the value of social proof for growing a brand.',
        'pitch': '''Hi Marissa,

In real estate, trust is everything — and nothing builds trust faster than a wall of genuine Google reviews.

I built a system that automates the entire review process: after every client interaction, it sends a personalized request via WhatsApp, SMS, or email. 5-star reviews flow to Google automatically, and the AI writes a unique, personalized reply to each one — instantly.

For a growing firm like CLICK Real Estate, this means every happy client becomes a magnet for new ones, without anyone on your team spending time on it.

Would you be open to a quick 15-minute demo? I think you\'d see the potential immediately.

Best,
[Your Name]
AI Social Reputation''',
        'status': 'Not Contacted',
    },
    {
        'name': 'Krystena King',
        'title': 'Award-Winning Entrepreneur',
        'company': 'Independent (Multiple Ventures)',
        'industry': 'Entrepreneurship / Service',
        'linkedin': 'https://www.linkedin.com/in/krystena-king-a2494865',
        'why': 'Has achieved Google Review Awards and recognition for superior satisfaction. Already understands the power of reviews — would appreciate automation.',
        'pitch': '''Hi Krystena,

I saw that you\'ve received Google Review Awards for your business — that\'s impressive and tells me you already understand how powerful reviews are for growth.

Here\'s what I built: an automated system that asks every customer for a review after each interaction (via WhatsApp, SMS, or email), routes 5-star ratings to Google, keeps anything lower private, and uses AI to write a personalized reply to every single review — instantly.

It essentially takes what you\'ve already proven works and puts it on complete autopilot. No more manually asking, no more forgetting to reply.

I\'d love to show you the demo. 15 minutes — would that work?

Best,
[Your Name]
AI Social Reputation''',
        'status': 'Not Contacted',
    },
]

# --- Build workbook ---
wb = Workbook()
ws = wb.active
ws.title = 'LinkedIn Outreach'
wb.properties.creator = 'Z.ai'

# --- Palette ---
PRIMARY = '1B2A4A'
NEUTRAL_900 = '37352F'
NEUTRAL_600 = '8C8A84'
NEUTRAL_100 = 'F7F7F5'
WHITE = 'FFFFFF'

font_title = Font(name='Times New Roman', size=16, color=PRIMARY, bold=True)
font_header = Font(name='Times New Roman', size=10, color=WHITE, bold=True)
font_body = Font(name='Times New Roman', size=10, color=NEUTRAL_900)
font_link = Font(name='Times New Roman', size=10, color='0066CC', underline='single')
font_caption = Font(name='Times New Roman', size=9, color=NEUTRAL_600, italic=True)
font_status = Font(name='Times New Roman', size=10, color='856404', bold=True)

fill_header = PatternFill(start_color=PRIMARY, end_color=PRIMARY, fill_type='solid')
fill_alt = PatternFill(start_color=NEUTRAL_100, end_color=NEUTRAL_100, fill_type='solid')
fill_white = PatternFill(start_color=WHITE, end_color=WHITE, fill_type='solid')
fill_status = PatternFill(start_color='FFF3CD', end_color='FFF3CD', fill_type='solid')

align_wrap = Alignment(wrap_text=True, vertical='top')
align_center = Alignment(horizontal='center', vertical='center', wrap_text=True)

# --- Layout ---
ws.column_dimensions['A'].width = 3
ws.row_dimensions[1].height = 15

ws.merge_cells('B2:J2')
ws['B2'] = 'AI Social Reputation — LinkedIn Outreach Prospects'
ws['B2'].font = font_title
ws['B2'].alignment = Alignment(vertical='center')
ws.row_dimensions[2].height = 32
ws.row_dimensions[3].height = 8

headers = ['#', 'Name', 'Title / Role', 'Company', 'Industry', 'LinkedIn Profile', 'Why Them?', 'Pitch Message', 'Status']
col_widths = [5, 18, 28, 24, 20, 42, 42, 58, 14]

for i, (h, w) in enumerate(zip(headers, col_widths), start=2):
    col_letter = get_column_letter(i)
    ws.column_dimensions[col_letter].width = w
    cell = ws.cell(row=4, column=i, value=h)
    cell.font = font_header
    cell.fill = fill_header
    cell.alignment = align_center

ws.row_dimensions[4].height = 28

for idx, p in enumerate(prospects):
    row = 5 + idx
    ws.row_dimensions[row].height = 130
    fill = fill_alt if idx % 2 == 0 else fill_white

    row_data = [idx + 1, p['name'], p['title'], p['company'], p['industry'], p['linkedin'], p['why'], p['pitch'].strip(), p['status']]

    for col_idx, val in enumerate(row_data, start=2):
        cell = ws.cell(row=row, column=col_idx, value=val)
        cell.alignment = align_wrap
        cell.fill = fill

        if col_idx == 2:
            cell.font = font_body
            cell.alignment = align_center
        elif col_idx == 7:
            cell.font = font_link
            cell.hyperlink = p['linkedin']
        elif col_idx == 10:
            cell.font = font_status
            cell.fill = fill_status
            cell.alignment = align_center
        else:
            cell.font = font_body

notes_row = 5 + len(prospects) + 1
ws.merge_cells(f'B{notes_row}:J{notes_row}')
ws[f'B{notes_row}'] = 'Tip: Click any LinkedIn link to open the profile. Copy the pitch and personalize before sending. Replace [Your Name] with your actual name.'
ws[f'B{notes_row}'].font = font_caption

ws.freeze_panes = 'C5'

output_path = '/home/z/my-project/download/AI_Social_Reputation_LinkedIn_Outreach.xlsx'
wb.save(output_path)
print(f'Saved to {output_path}')
