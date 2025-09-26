#!/usr/bin/env node

/**
 * 🌀 Vortex Spinner - Framework Integration Examples
 * 
 * This demo showcases how to integrate Vortex Spinner with popular frameworks
 * Run with: node examples/framework-examples.js
 */

import { 
  loading, 
  success, 
  error, 
  loaders,
  quick,
  magic 
} from '../dist/index.js';

// Utility function to simulate async work
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runFrameworkExamples() {
  console.log('🌀 Vortex Spinner - Framework Integration Examples\n');

  // 1. Express.js API Example
  console.log('1. Express.js API Server Example:');
  console.log('   Simulating Express.js middleware and routes...\n');
  
  // Simulate Express.js middleware
  async function simulateExpressMiddleware(method, path) {
    const loader = loaders.api(`${method} ${path}`);
    
    try {
      // Simulate API processing
      await delay(Math.random() * 2000 + 500);
      
      // Simulate random success/error
      if (Math.random() > 0.2) {
        loader.success(`${method} ${path} - 200 OK`);
        return { status: 200, data: 'Success' };
      } else {
        loader.error(`${method} ${path} - 500 Error`);
        return { status: 500, error: 'Internal Server Error' };
      }
    } catch (err) {
      loader.error(`${method} ${path} - Error: ${err.message}`);
      return { status: 500, error: err.message };
    }
  }
  
  // Simulate multiple API calls
  await simulateExpressMiddleware('GET', '/api/users');
  await delay(300);
  await simulateExpressMiddleware('POST', '/api/users');
  await delay(300);
  await simulateExpressMiddleware('PUT', '/api/users/123');
  await delay(300);
  await simulateExpressMiddleware('DELETE', '/api/users/123');
  
  await delay(1000);
  console.log('\n');

  // 2. React Component Example
  console.log('2. React Component Example:');
  console.log('   Simulating React component lifecycle...\n');
  
  // Simulate React useEffect hook
  async function simulateReactComponent(userId) {
    console.log(`   Rendering UserProfile component for user ${userId}`);
    
    const userData = await quick.api(async () => {
      await delay(1500);
      return {
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`
      };
    }, `Loading user ${userId} profile...`);
    
    console.log(`   User data loaded:`, userData);
    return userData;
  }
  
  // Simulate multiple React components
  await simulateReactComponent(1);
  await delay(500);
  await simulateReactComponent(2);
  await delay(500);
  await simulateReactComponent(3);
  
  await delay(1000);
  console.log('\n');

  // 3. Vue.js Composition API Example
  console.log('3. Vue.js Composition API Example:');
  console.log('   Simulating Vue.js composable...\n');
  
  // Simulate Vue.js composable
  async function useAsyncData(fetchFn, loadingText) {
    console.log('   Setting up Vue composable...');
    
    const loader = magic(loadingText);
    
    try {
      const data = await fetchFn();
      loader.success('Data loaded successfully!');
      console.log('   Composable data:', data);
      return { data, error: null, loading: false };
    } catch (err) {
      loader.error(`Failed to load data: ${err.message}`);
      return { data: null, error: err, loading: false };
    }
  }
  
  // Simulate Vue.js dashboard
  const dashboardData = await useAsyncData(async () => {
    await delay(2000);
    return {
      users: 1250,
      orders: 3420,
      revenue: '$45,230',
      growth: '+12.5%'
    };
  }, 'Loading dashboard data...');
  
  await delay(1000);
  console.log('\n');

  // 4. CLI Tool Example
  console.log('4. CLI Tool Example:');
  console.log('   Simulating command-line build tool...\n');
  
  async function simulateBuildTool() {
    console.log('   🔨 Starting build process...');
    
    // Install dependencies
    const installLoader = loaders.build('Installing dependencies...');
    await delay(2000);
    installLoader.success('Dependencies installed!');
    
    await delay(500);
    
    // Compile TypeScript
    const compileLoader = loaders.build('Compiling TypeScript...');
    await delay(1500);
    compileLoader.success('TypeScript compiled!');
    
    await delay(500);
    
    // Bundle assets
    const bundleLoader = loaders.build('Bundling assets...');
    await delay(1800);
    bundleLoader.success('Assets bundled!');
    
    await delay(500);
    
    // Run tests
    const testLoader = loaders.build('Running tests...');
    await delay(1200);
    testLoader.success('All tests passed!');
    
    await delay(500);
    
    // Deploy
    const deployLoader = loaders.network('Deploying to production...');
    await delay(2500);
    deployLoader.success('Deployment successful!');
    
    success('🎉 Build completed successfully!');
  }
  
  await simulateBuildTool();
  
  await delay(1000);
  console.log('\n');

  // 5. Next.js API Route Example
  console.log('5. Next.js API Route Example:');
  console.log('   Simulating Next.js API routes...\n');
  
  async function simulateNextjsApiRoute(endpoint, data) {
    console.log(`   Processing ${endpoint} request...`);
    
    const loader = loaders.api(`Processing ${endpoint}...`);
    
    try {
      // Simulate database operations
      if (endpoint.includes('users')) {
        await delay(800);
        loader.update('Querying user database...');
        await delay(700);
      } else if (endpoint.includes('posts')) {
        await delay(600);
        loader.update('Fetching posts...');
        await delay(900);
      }
      
      loader.success(`${endpoint} processed successfully!`);
      return { success: true, data };
    } catch (err) {
      loader.error(`${endpoint} failed: ${err.message}`);
      return { success: false, error: err.message };
    }
  }
  
  // Simulate API routes
  await simulateNextjsApiRoute('/api/users', { users: [] });
  await delay(300);
  await simulateNextjsApiRoute('/api/posts', { posts: [] });
  await delay(300);
  await simulateNextjsApiRoute('/api/auth/login', { token: 'jwt-token' });
  
  await delay(1000);
  console.log('\n');

  // 6. Database Operations Example
  console.log('6. Database Operations Example:');
  console.log('   Simulating database operations...\n');
  
  async function simulateDatabaseOperations() {
    // Migration
    const migrationLoader = loaders.database('Running database migrations...');
    await delay(2000);
    migrationLoader.success('Migrations completed!');
    
    await delay(500);
    
    // Seeding
    const seedLoader = loaders.database('Seeding database...');
    await delay(1500);
    seedLoader.success('Database seeded!');
    
    await delay(500);
    
    // Backup
    const backupLoader = loaders.database('Creating backup...');
    await delay(2500);
    backupLoader.success('Backup created!');
    
    await delay(500);
    
    // Optimization
    const optimizeLoader = loaders.database('Optimizing indexes...');
    await delay(1800);
    optimizeLoader.success('Indexes optimized!');
  }
  
  await simulateDatabaseOperations();
  
  await delay(1000);
  console.log('\n');

  // 7. File Processing Example
  console.log('7. File Processing Example:');
  console.log('   Simulating file operations...\n');
  
  async function simulateFileProcessing() {
    const files = ['config.json', 'data.csv', 'image.png', 'document.pdf'];
    
    for (const file of files) {
      const fileLoader = loaders.file(`Processing ${file}...`);
      await delay(Math.random() * 1000 + 500);
      fileLoader.success(`${file} processed!`);
      await delay(200);
    }
    
    success('All files processed successfully!');
  }
  
  await simulateFileProcessing();
  
  await delay(1000);
  console.log('\n');

  console.log('🎉 All framework examples completed!');
  console.log('\nThese examples show how Vortex Spinner integrates seamlessly with:');
  console.log('- Express.js servers and APIs');
  console.log('- React components and hooks');
  console.log('- Vue.js composition API');
  console.log('- CLI build tools');
  console.log('- Next.js API routes');
  console.log('- Database operations');
  console.log('- File processing systems');
  console.log('\nTry other examples:');
  console.log('- node examples/basic-usage.js');
  console.log('- node examples/advanced-usage.js');
  console.log('- node examples/performance-demo.js');
}

// Run the examples
runFrameworkExamples().catch(console.error);