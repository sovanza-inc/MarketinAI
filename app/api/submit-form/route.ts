import { google } from 'googleapis';
import { NextResponse } from 'next/server';

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    private_key: (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

export async function POST(request: Request) {
  if (!SPREADSHEET_ID) {
    console.error('Missing GOOGLE_SHEETS_SPREADSHEET_ID');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  try {
    // First, verify we can access the spreadsheet
    try {
      await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
      });
    } catch (error: any) {
      if (error?.response?.status === 403) {
        console.error('Permission denied. Make sure the service account has access to the spreadsheet');
        return NextResponse.json(
          { error: 'Permission denied. Please check service account permissions.' },
          { status: 403 }
        );
      }
      throw error;
    }

    const body = await request.json();
    const {
      name,
      email,
      businessType,
      marketingChannels,
      country,
      monthlyBudget,
      website,
      businessDescription,
      monthlyRevenue,
      targetRevenue,
      obstacle,
      startTime,
    } = body;

    // Format the data for Google Sheets
    const values = [
      [
        new Date().toISOString(), // Timestamp
        name,
        email,
        businessType,
        Array.isArray(marketingChannels) ? marketingChannels.join(', ') : marketingChannels,
        country,
        monthlyBudget,
        website || 'N/A',
        businessDescription,
        monthlyRevenue?.toString() || '0',
        targetRevenue?.toString() || '0',
        obstacle,
        startTime,
      ],
    ];

    // Append the data to the Google Sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Sheet1!A:M', // Adjust the range based on your sheet
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    if (response.status !== 200) {
      console.error('Failed to append data:', response.statusText);
      throw new Error(`Failed to append data: ${response.statusText}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
} 