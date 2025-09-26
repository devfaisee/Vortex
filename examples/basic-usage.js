#!/usr/bin/env node

/**
 * 🌀 Vortex Spinner - Basic Usage Examples
 * 
 * This demo showcases the basic functionality of Vortex Spinner
 * Run with: node examples/basic-usage.js
 */

import { 
  loading, 
  success, 
  error, 
  warn, 
  info,
  loaders,
  quick,
  smart,
  magic 
} from '../dist/index.js';

// Utility function to simulate async work
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runBasicExamples() {
  console.log('🌀 Vortex Spinner - Basic Usage Examples\n');

  // 1. Instant Messages (like console.log!)
  console.log('1. Instant Messages:');
  success('✅ Package installed successfully!');
  error('❌ Connection failed!');
  warn('⚠️ Deprecated API detected!');
  info('ℹ️ Using cached data!');
  
  await delay(2000);
  console.log('\n');

  // 2. Simple Loading
  console.log('2. Simple Loading:');
  const loader1 = loading('Downloading files...');
  await delay(2000);
  loader1.success('Files downloaded successfully!');
  
  await delay(1000);

  const loader2 = loading('Processing data...');
  await delay(1500);
  loader2.error('Processing failed!');
  
  await delay(1000);
  console.log('\n');

  // 3. Auto Loader (Handles Everything)
  console.log('3. Auto Loader:');
  try {
    const result = await loading.auto('Fetching user data...', async () => {
      await delay(2000);
      // Simulate success
      return { users: ['Alice', 'Bob', 'Charlie'] };
    });
    console.log('Result:', result);
  } catch (err) {
    console.log('Error:', err.message);
  }
  
  await delay(1000);
  console.log('\n');

  // 4. Themed Loaders
  console.log('4. Themed Loaders:');
  
  const fileLoader = loaders.file('Reading configuration...');
  await delay(1500);
  fileLoader.success('Configuration loaded!');
  
  await delay(500);
  
  const networkLoader = loaders.network('Connecting to API...');
  await delay(1500);
  networkLoader.success('Connected successfully!');
  
  await delay(500);
  
  const dbLoader = loaders.database('Querying records...');
  await delay(1500);
  dbLoader.success('Records retrieved!');
  
  await delay(500);
  
  const buildLoader = loaders.build('Compiling TypeScript...');
  await delay(2000);
  buildLoader.success('Compilation complete!');
  
  await delay(1000);
  console.log('\n');

  // 5. Quick Functions (One-liners)
  console.log('5. Quick Functions:');
  
  const apiData = await quick.api(async () => {
    await delay(1500);
    return { status: 'success', data: 'API response' };
  }, 'Calling API...');
  console.log('API Result:', apiData);
  
  await delay(500);
  
  const fileData = await quick.file(async () => {
    await delay(1000);
    return 'File content loaded';
  }, 'Reading file...');
  console.log('File Result:', fileData);
  
  await delay(1000);
  console.log('\n');

  // 6. Smart Loader (Context Aware)
  console.log('6. Smart Loader:');
  
  const smartLoader1 = smart('file', 'Processing documents...');
  await delay(1500);
  smartLoader1.success('Documents processed!');
  
  await delay(500);
  
  const smartLoader2 = smart('api', 'Syncing with server...');
  await delay(1500);
  smartLoader2.success('Sync complete!');
  
  await delay(1000);
  console.log('\n');

  // 7. Magic Loader (Auto-Detection)
  console.log('7. Magic Loader:');
  
  const magicLoader1 = magic('Building React application...');
  await delay(2000);
  magicLoader1.success('Build complete!');
  
  await delay(500);
  
  const magicLoader2 = magic('Fetching from GraphQL API...');
  await delay(1500);
  magicLoader2.success('Data fetched!');
  
  await delay(500);
  
  const magicLoader3 = magic('Processing user files...');
  await delay(1500);
  magicLoader3.success('Files processed!');
  
  await delay(1000);
  console.log('\n');

  // 8. Progress Tracking
  console.log('8. Progress Tracking:');
  const progressLoader = loading('Processing items...');
  
  for (let i = 0; i <= 100; i += 10) {
    progressLoader.setProgress(i);
    progressLoader.setText(`Processing items... ${i}%`);
    await delay(200);
  }
  
  progressLoader.success('All items processed!');
  
  await delay(1000);
  console.log('\n');

  // 9. Error Handling
  console.log('9. Error Handling:');
  try {
    await loading.auto('Risky operation...', async () => {
      await delay(1000);
      throw new Error('Something went wrong!');
    });
  } catch (err) {
    error(`Operation failed: ${err.message}`);
  }
  
  await delay(1000);
  console.log('\n');

  console.log('🎉 All examples completed!');
  console.log('\nTry running other examples:');
  console.log('- node examples/framework-examples.js');
  console.log('- node examples/advanced-usage.js');
  console.log('- node examples/performance-demo.js');
}

// Run the examples
runBasicExamples().catch(console.error);