# Count chars for each note - v3 ultra trim
notes = {
    "Simon Rand": "Hi Simon, love KuulSeats! I'm Hanan — I automate Google reviews via WhatsApp/SMS/Email and turn each 5-star into social posts. Restaurants see 3-5x more reviews, zero effort. 10-min chat? —Hanan",

    "Hina Mistry": "Hi Hina, impressive work! I'm Hanan — I automate Google reviews for dental practices via WhatsApp/SMS/Email. Patients get auto requests after every visit. 3-5x more reviews fast. Quick demo? —Hanan",

    "Andrew Heppinstall": "Hi Andrew, great agency! I'm Hanan — I built AI Social Reputation: auto Google reviews via WhatsApp/SMS/Email, each becomes social content. Perfect add-on for your clients. Partnership call? —Hanan",

    "Jennifer Donahue": "Hi Jennifer, love Positive Sentiment! I'm Hanan — I automate hotel reviews via WhatsApp/SMS/Email: auto requests, AI replies, 5-stars become social posts. Complements your services. Demo? —Hanan",

    "Ryan Cornelius": "Hi Ryan, 3.4 to 4.3 is incredible! I'm Hanan — I automate what you did manually: auto review requests via WhatsApp/SMS/Email, AI replies, reviews become social posts. Scale it? —Hanan",
}

for name, note in notes.items():
    l = len(note)
    status = "OK" if l <= 200 else f"OVER by {l-200}"
    print(f"{name}: {l} chars — {status}")
    if l > 200:
        print(f"  Trimmed: {note[:197]}...")