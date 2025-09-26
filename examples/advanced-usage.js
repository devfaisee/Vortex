#!/usr/bin/env node

/**
 * 🌀 Vortex Spinner - Advanced Usage Examples
 * 
 * This demo showcases advanced features and custom configurations
 * Run with: node examples/advanced-usage.js
 */

import { 
  Vortex,
  loading, 
  success, 
  error, 
  loaders,
  getAdaptiveSpinner,
  createCustomSpinner,
  TerminalDetector,
  ProgressPredictor
} from '../dist/index.js';

// Utility function to simulate async work
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runAdvancedExamples() {
  console.log('🌀 Vortex Spinner - Advanced Usage Examples\n');

  // 1. Custom Spinner Configuration
  console.log('1. Custom Spinner Configuration:');
  
  const customSpinner = new Vortex({
    text: 'Custom configuration...',
    spinner: 'quantum',
    color: 'magenta',
    interval: 120,
    gradient: true,
    bold: true,
    prefixText: '🔬 ',
    suffixText: ' [QUANTUM]'
  });
  
  customSpinner.start();
  await delay(3000);
  customSpinner.succeed('Quantum processing complete!');
  
  await delay(1000);
  console.log('\n');

  // 2. Progress Prediction
  console.log('2. Progress Prediction:');
  
  const predictiveSpinner = new Vortex({
    text: 'Analyzing with prediction...',
    spinner: 'neural',
    predictive: true,
    color: 'cyan'
  });
  
  predictiveSpinner.start();
  
  // Simulate variable progress
  const progressSteps = [5, 15, 30, 45, 60, 75, 85, 95, 100];
  for (const progress of progressSteps) {
    await delay(Math.random() * 500 + 300);
    predictiveSpinner.setProgress(progress);
    predictiveSpinner.setText(`Neural analysis... ${progress}%`);
  }
  
  predictiveSpinner.succeed('Analysis complete with predictions!');
  
  await delay(1000);
  console.log('\n');

  // 3. Terminal Adaptation
  console.log('3. Terminal Adaptation:');
  
  console.log('Terminal capabilities:');
  console.log(`- Supports color: ${TerminalDetector.supportsColor()}`);
  console.log(`- Supports Unicode: ${TerminalDetector.supportsUnicode()}`);
  console.log(`- Terminal width: ${TerminalDetector.getTerminalWidth()}`);
  console.log(`- Is TTY: ${TerminalDetector.isTTY()}`);
  console.log(`- Is CI: ${TerminalDetector.isCI()}`);
  
  const adaptiveSpinner = getAdaptiveSpinner();
  console.log(`Recommended spinner: ${adaptiveSpinner}`);
  
  const adaptedLoader = new Vortex({
    text: 'Adaptive loading...',
    spinner: adaptiveSpinner,
    adaptive: true
  });
  
  adaptedLoader.start();
  await delay(2000);
  adaptedLoader.succeed('Adapted to terminal capabilities!');
  
  await delay(1000);
  console.log('\n');

  // 4. Custom Animation Frames
  console.log('4. Custom Animation Frames:');
  
  const customFrames = createCustomSpinner([
    '🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'
  ], 150);
  
  const moonSpinner = new Vortex({
    text: 'Moon phases animation...',
    spinner: customFrames,
    color: 'yellow'
  });
  
  moonSpinner.start();
  await delay(3000);
  moonSpinner.succeed('Moon cycle complete!');
  
  await delay(1000);
  console.log('\n');

  // 5. Multiple Concurrent Spinners
  console.log('5. Multiple Concurrent Operations:');
  
  const operations = [
    { name: 'Database backup', duration: 2000, type: 'database' },
    { name: 'File compression', duration: 1500, type: 'file' },
    { name: 'API synchronization', duration: 2500, type: 'network' },
    { name: 'Code compilation', duration: 1800, type: 'build' }
  ];
  
  // Start all operations concurrently
  const promises = operations.map(async (op, index) => {
    await delay(index * 200); // Stagger start times
    
    const loader = loaders[op.type](`${op.name}...`);
    await delay(op.duration);
    loader.success(`${op.name} completed!`);
  });
  
  await Promise.all(promises);
  success('All concurrent operations completed!');
  
  await delay(1000);
  console.log('\n');

  // 6. Error Recovery and Retry Logic
  console.log('6. Error Recovery and Retry Logic:');
  
  async function simulateRetryOperation() {
    const maxRetries = 3;
    let attempt = 0;
    
    while (attempt < maxRetries) {
      attempt++;
      const loader = loading(`Attempting operation (${attempt}/${maxRetries})...`);
      
      try {
        await delay(1000);
        
        // Simulate random failure
        if (Math.random() < 0.7 && attempt < maxRetries) {
          throw new Error('Network timeout');
        }
        
        loader.success('Operation succeeded!');
        return true;
      } catch (err) {
        if (attempt < maxRetries) {
          loader.warn(`Attempt ${attempt} failed, retrying...`);
          await delay(500);
        } else {
          loader.error('All attempts failed!');
          return false;
        }
      }
    }
  }
  
  await simulateRetryOperation();
  
  await delay(1000);
  console.log('\n');

  // 7. Progress Predictor Usage
  console.log('7. Progress Predictor Usage:');
  
  const predictor = new ProgressPredictor();
  const progressLoader = loading('Smart progress tracking...');
  
  const startTime = Date.now();
  for (let i = 0; i <= 100; i += 5) {
    await delay(Math.random() * 200 + 100);
    
    predictor.addDataPoint(i);
    const timeRemaining = predictor.getEstimatedTimeRemaining();
    const completionTime = predictor.getEstimatedCompletionTime();
    
    let text = `Smart progress... ${i}%`;
    if (timeRemaining && i > 20) {
      text += ` (${Math.round(timeRemaining / 1000)}s remaining)`;
    }
    
    progressLoader.setText(text);
    progressLoader.setProgress(i);
  }
  
  const totalTime = Date.now() - startTime;
  progressLoader.success(`Completed in ${Math.round(totalTime / 1000)}s!`);
  
  await delay(1000);
  console.log('\n');

  // 8. Complex Multi-Stage Process
  console.log('8. Complex Multi-Stage Process:');
  
  async function simulateComplexDeployment() {
    const stages = [
      { name: 'Pre-deployment checks', steps: ['Validate config', 'Check dependencies', 'Run tests'] },
      { name: 'Build process', steps: ['Compile code', 'Bundle assets', 'Optimize images'] },
      { name: 'Deployment', steps: ['Upload files', 'Update database', 'Clear cache'] },
      { name: 'Post-deployment', steps: ['Health checks', 'Smoke tests', 'Notify team'] }
    ];
    
    for (const stage of stages) {
      console.log(`\n   📋 ${stage.name}:`);
      
      for (const step of stage.steps) {
        const stepLoader = loading(`   ${step}...`);
        await delay(Math.random() * 1000 + 500);
        stepLoader.success(`   ${step} ✓`);
        await delay(200);
      }
    }
    
    success('\n🚀 Deployment completed successfully!');
  }
  
  await simulateComplexDeployment();
  
  await delay(1000);
  console.log('\n');

  // 9. Performance Monitoring
  console.log('9. Performance Monitoring:');
  
  const performanceLoader = loading('Monitoring performance...');
  const startMemory = process.memoryUsage();
  const startCPU = process.cpuUsage();
  
  // Simulate some work
  await delay(2000);
  
  const endMemory = process.memoryUsage();
  const endCPU = process.cpuUsage(startCPU);
  
  const memoryDiff = endMemory.heapUsed - startMemory.heapUsed;
  const cpuTime = (endCPU.user + endCPU.system) / 1000; // Convert to ms
  
  performanceLoader.success('Performance monitoring complete!');
  
  console.log(`Memory usage: ${(memoryDiff / 1024 / 1024).toFixed(2)} MB`);
  console.log(`CPU time: ${cpuTime.toFixed(2)} ms`);
  
  await delay(1000);
  console.log('\n');

  // 10. Graceful Shutdown
  console.log('10. Graceful Shutdown:');
  
  const shutdownLoader = loading('Initiating graceful shutdown...');
  
  // Simulate cleanup tasks
  const cleanupTasks = [
    'Closing database connections',
    'Finishing pending requests',
    'Saving application state',
    'Releasing resources'
  ];
  
  for (const task of cleanupTasks) {
    shutdownLoader.setText(task + '...');
    await delay(500);
  }
  
  shutdownLoader.success('Shutdown completed gracefully!');
  
  await delay(1000);
  console.log('\n');

  console.log('🎉 All advanced examples completed!');
  console.log('\nAdvanced features demonstrated:');
  console.log('- Custom spinner configurations');
  console.log('- Progress prediction algorithms');
  console.log('- Terminal capability detection');
  console.log('- Custom animation frames');
  console.log('- Concurrent operations');
  console.log('- Error recovery and retry logic');
  console.log('- Smart progress tracking');
  console.log('- Multi-stage processes');
  console.log('- Performance monitoring');
  console.log('- Graceful shutdown procedures');
  console.log('\nTry other examples:');
  console.log('- node examples/basic-usage.js');
  console.log('- node examples/framework-examples.js');
  console.log('- node examples/performance-demo.js');
}

// Run the examples
runAdvancedExamples().catch(console.error);