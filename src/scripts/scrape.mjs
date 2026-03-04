import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// Initialize Supabase. Requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function scrapeNICData() {
    console.log('Fetching data from https://ventures.nic.gov.vn/ ...');

    try {
        // Note: The NIC website heavily relies on obfuscated JS (dPHP payload). 
        // This script retrieves the raw HTML and attempts to extract the base JSON payload
        // A fully robust scraper may require Puppeteer if the structure changes frequently.

        const response = await fetch('https://ventures.nic.gov.vn/');
        const html = await response.text();

        // Attempting to match the dPHP cache object which contains the pre-loaded data
        const dphpMatch = html.match(/var dPHP = (\{.*?\});\r?\n/s);

        if (!dphpMatch || dphpMatch.length < 2) {
            console.warn('Could not extract dPHP object from the HTML. The site structure may have changed.');
            console.log('Please consider using a browser-automation tool like Playwright or Puppeteer to extract the DOM elements.');
            return;
        }

        // Evaluate the matched object structure (use with caution, raw eval is not recommended in production)
        // Here we'll just log it for the user to inspect and adapt the Supabase insert logic.
        console.log('Successfully found data payload. Here is a snippet:');
        console.log(dphpMatch[1].substring(0, 500) + '...');

        // Example instruction for Supabase insertion:
        /*
          const startups = parseExtractedData(dphpMatch[1]);
          const { data, error } = await supabase
            .from('startups')
            .insert(startups);
            
          if (error) console.error('Error inserting:', error);
          else console.log('Successfully migrated data to Supabase!');
        */

        console.log('\n--- Next Steps ---');
        console.log('1. Map the extracted payload to your Supabase schema.');
        console.log('2. Uncomment the Supabase insert code above.');
        console.log('3. Run this script again: node src/scripts/scrape.mjs');

    } catch (error) {
        console.error('Error during scraping:', error);
    }
}

scrapeNICData();
