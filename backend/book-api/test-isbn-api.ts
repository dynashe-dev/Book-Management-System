import 'dotenv/config';
import * as http from 'http';

const API_BASE = 'http://localhost:3000/api';

function makeRequest(
  method: string,
  path: string,
  data?: any,
  token?: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    const url = new URL(API_BASE + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(body);
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(jsonData);
          } else {
            reject({
              status: res.statusCode,
              data: jsonData,
            });
          }
        } catch (e) {
          reject({ status: res.statusCode, error: body });
        }
      });
    });

    req.on('error', reject);
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testISBNCreation() {
  try {
    console.log('\n=== Testing ISBN Creation Flow ===\n');

    // Step 1: Register or login
    console.log('Step 1: Attempting to login...');
    let token: string;
    try {
      const loginData = await makeRequest('POST', '/auth/login', {
        email: 'debug@test.com',
        password: 'debugpass123',
      });
      token = loginData.token;
      console.log('✓ Logged in successfully');
      console.log('✓ Token:', token.substring(0, 50) + '...');
    } catch (err: any) {
      if (err.status === 401 || err.data?.statusCode === 401) {
        console.log('✓ No existing user, registering...');
        try {
          const registerData = await makeRequest('POST', '/auth/register', {
            username: 'debuguser',
            email: 'debug@test.com',
            password: 'debugpass123',
          });
          console.log('✓ Registered successfully');
          console.log('✓ Now logging in...');
          
          const loginData = await makeRequest('POST', '/auth/login', {
            email: 'debug@test.com',
            password: 'debugpass123',
          });
          token = loginData.token;
          console.log('✓ Logged in successfully');
          console.log('✓ Token:', token.substring(0, 50) + '...');
        } catch (e) {
          throw e;
        }
      } else {
        throw err;
      }
    }

    // Step 2: Create a book with ISBN1
    console.log('\nStep 2: Creating book with ISBN-1...');
    const isbn1 = '978-0-596-00712-6';
    try {
      const book1 = await makeRequest(
        'POST',
        '/books',
        {
          title: 'Learning Python - ISBN Test 1',
          author: 'Mark Lutz',
          isbn: isbn1,
          publishedYear: 2013,
          description: 'Test book with first ISBN',
        },
        token
      );
      console.log('✓ Book 1 created:', book1.id);
      console.log(`✓ ISBN stored: ${book1.Isbn}`);
    } catch (err: any) {
      console.error('✗ Failed to create book 1:', err.data || err.error);
    }

    // Step 3: Create a book with ISBN2
    console.log('\nStep 3: Creating book with ISBN-2...');
    const isbn2 = '978-0-134-49418-0';
    try {
      const book2 = await makeRequest(
        'POST',
        '/books',
        {
          title: 'Effective Java - ISBN Test 2',
          author: 'Joshua Bloch',
          isbn: isbn2,
          publishedYear: 2018,
          description: 'Test book with second ISBN',
        },
        token
      );
      console.log('✓ Book 2 created:', book2.id);
      console.log(`✓ ISBN stored: ${book2.Isbn}`);
    } catch (err: any) {
      console.error('✗ Failed to create book 2:', err.data || err.error);
    }

    // Step 4: Get all books
    console.log('\nStep 4: Fetching all books...');
    const allBooks = await makeRequest('GET', '/books', undefined, token);
    console.log(`✓ Found ${allBooks.length} books`);
    allBooks.slice(-3).forEach((book: any) => {
      console.log(`  - ID: ${book.id}, Title: ${book.title}, ISBN: ${book.Isbn}`);
    });

    console.log('\n✓ Test completed!\n');
  } catch (error) {
    console.error('Error:', error);
  }

  process.exit(0);
}

testISBNCreation();
