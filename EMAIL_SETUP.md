# Email Confirmation Setup Guide

This application uses EmailJS to send confirmation emails to customers when they book seats. Follow these steps to set it up:

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)
3. Verify your email address

## Step 2: Set Up Email Service

1. In your EmailJS dashboard, click **"Add New Service"**
2. Choose your email provider (Gmail, Outlook, etc.)
3. Follow the instructions to connect your email account
4. Note down your **Service ID** (e.g., `service_abc123`)

## Step 3: Create Email Template

1. Click **"Email Templates"** in the sidebar
2. Click **"Create New Template"**
3. Use this template content:

### Template Name
`FIFA Booking Confirmation`

### Subject
`FIFA World Cup 2026 - Booking Confirmation {{confirmation_number}}`

### Email Body
```
Hello {{to_name}},

Thank you for booking your FIFA World Cup 2026 tickets!

BOOKING CONFIRMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Confirmation Number: {{confirmation_number}}
Booking Date: {{booking_date}}

MATCH DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Match: {{match_name}}
Teams: {{match_teams}}
Date: {{match_date}}
Time: {{match_time}}
Venue: BMO Field, Toronto

TICKET DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Number of Seats: {{seat_count}}

Your Seats:
{{seat_details}}

CUSTOMER INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: {{to_name}}
Email: {{to_email}}
Phone: {{phone}}
Country: {{country}}
Special Requests: {{special_requests}}

PAYMENT SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Total Amount: ${{total_price}}

IMPORTANT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Please save this confirmation email
✓ Bring a valid ID and this confirmation to the venue
✓ Arrive at least 2 hours before match time
✓ Your confirmation number: {{confirmation_number}}

If you have any questions, please contact us at support@fifatoronto2026.com

See you at the match!

FIFA World Cup 2026 Toronto
BMO Field - 170 Princes' Blvd, Toronto, ON M6K 3C3, Canada

---
This is an automated confirmation email. Please do not reply to this email.
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

## Step 4: Get Your Public Key

1. Go to **"Account"** → **"General"** in EmailJS dashboard
2. Find your **Public Key** (e.g., `abcdefghijk123456`)

## Step 5: Update the Application Code

### For index.html

Open `index.html` and find this line (around line 208):
```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
```

Replace `YOUR_PUBLIC_KEY` with your actual public key:
```javascript
emailjs.init("abcdefghijk123456");
```

### For script.js

Open `script.js` and find this line (around line 436):
```javascript
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

Replace with your actual IDs:
```javascript
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

### For fifa-booking-standalone.html

Open `fifa-booking-standalone.html` and make the same changes:
1. Line ~682: Replace `YOUR_PUBLIC_KEY` with your public key
2. Line ~959: Replace `YOUR_SERVICE_ID` and `YOUR_TEMPLATE_ID` with your actual IDs

## Step 6: Test the Email Functionality

1. Open the application in your browser
2. Select a match
3. Choose seats
4. Fill in the booking form with a **real email address**
5. Submit the booking
6. Check your email inbox for the confirmation

## Troubleshooting

### Emails Not Sending?

1. **Check Browser Console**: Open Developer Tools (F12) and check for errors
2. **Verify IDs**: Make sure Service ID, Template ID, and Public Key are correct
3. **Check EmailJS Dashboard**: Go to "History" to see if emails were sent
4. **Email Limits**: Free plan allows 200 emails/month
5. **Spam Folder**: Check if emails are going to spam

### Common Errors

**Error: "Invalid public key"**
- Solution: Double-check your public key in the EmailJS dashboard

**Error: "Template not found"**
- Solution: Verify your template ID is correct

**Error: "Service not found"**
- Solution: Verify your service ID and that the service is active

## Email Template Variables

The application passes these variables to the email template:

- `{{to_email}}` - Customer email
- `{{to_name}}` - Customer name
- `{{confirmation_number}}` - Unique booking confirmation number
- `{{match_name}}` - Match name (e.g., "Group Stage Match 1")
- `{{match_teams}}` - Teams playing (e.g., "Canada vs Mexico")
- `{{match_date}}` - Match date
- `{{match_time}}` - Match time
- `{{seat_count}}` - Number of seats booked
- `{{seat_details}}` - List of seat details
- `{{total_price}}` - Total booking price
- `{{booking_date}}` - Date/time of booking
- `{{phone}}` - Customer phone number
- `{{country}}` - Customer country
- `{{special_requests}}` - Any special requests

## Cost

EmailJS offers a **free tier** with:
- 200 emails per month
- Perfect for testing and small-scale use

For production use with more emails, check their pricing plans at [https://www.emailjs.com/pricing/](https://www.emailjs.com/pricing/)

## Security Note

Your Public Key is safe to expose in client-side code. However, never expose your Private Key if you upgrade to a paid plan.

## Alternative Email Services

If you need more emails or advanced features, consider:
- SendGrid
- Mailgun
- Amazon SES
- Postmark

These require backend integration but offer higher limits and more features.

---

For more information, visit the [EmailJS Documentation](https://www.emailjs.com/docs/)
