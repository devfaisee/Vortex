#!/usr/bin/env node

import { Vortex, spinners } from './index.js';

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function basicDemo(): Promise<void> {
  console.log('\n🌪️  VORTEX CLI SPINNER DEMO\n');
  
  // Basic spinner
  const spinner1 = new Vortex({ text: 'Loading basic spinner...' });
  spinner1.start();
  await sleep(2000);
  spinner1.succeed('Basic spinner completed!');
  
  await sleep(500);
}

async function adaptiveDemo(): Promise<void> {
  console.log('\n🎨 ADAPTIVE SPINNERS DEMO\n');
  
  const spinnerTypes = ['vortex', 'wave', 'pulse', 'geometric', 'matrix', 'dna'];
  
  for (const type of spinnerTypes) {
    const spinner = new Vortex({ 
      text: `Showcasing ${type} spinner...`,
      spinner: spinners[type],
      adaptive: true
    });
    
    spinner.start();
    await sleep(1500);
    spinner.succeed(`${type.charAt(0).toUpperCase() + type.slice(1)} spinner rocks!`);
    await sleep(300);
  }
}

async function progressDemo(): Promise<void> {
  console.log('\n📊 PROGRESS PREDICTION DEMO\n');
  
  const spinner = new Vortex({ 
    text: 'Installing packages...',
    predictive: true
  });
  
  spinner.start();
  
  // Simulate progress updates
  const total = 100;
  for (let i = 0; i <= total; i += Math.random() * 5 + 1) {
    spinner.updateProgress(Math.min(i, total), total);
    await sleep(Math.random() * 200 + 100);
  }
  
  spinner.succeed('All packages installed successfully!');
  await sleep(500);
}

async function realWorldDemo(): Promise<void> {
  console.log('\n🚀 REAL-WORLD SCENARIOS DEMO\n');
  
  // NPM install simulation
  const npmSpinner = new Vortex({ 
    text: 'npm install',
    predictive: true,
    prefixText: '📦'
  });
  
  npmSpinner.start();
  
  // Simulate package installation with varying speeds
  let progress = 0;
  const packages = ['react', 'typescript', 'webpack', 'babel', 'eslint'];
  
  for (const pkg of packages) {
    npmSpinner.setText(`Installing ${pkg}...`);
    const increment = Math.random() * 20 + 10;
    progress += increment;
    npmSpinner.updateProgress(progress, 100);
    await sleep(Math.random() * 1000 + 500);
  }
  
  npmSpinner.succeed('All dependencies installed! 🎉');
  
  await sleep(500);
  
  // Build process simulation
  const buildSpinner = new Vortex({ 
    text: 'Building project...',
    spinner: spinners.matrix,
    predictive: true,
    prefixText: '🔨'
  });
  
  buildSpinner.start();
  
  const buildSteps = [
    'Compiling TypeScript...',
    'Bundling modules...',
    'Optimizing assets...',
    'Generating source maps...',
    'Finalizing build...'
  ];
  
  for (let i = 0; i < buildSteps.length; i++) {
    buildSpinner.setText(buildSteps[i]);
    buildSpinner.updateProgress((i + 1) * 20, 100);
    await sleep(Math.random() * 800 + 400);
  }
  
  buildSpinner.succeed('Build completed successfully! ✨');
  
  await sleep(500);
}

async function statusDemo(): Promise<void> {
  console.log('\n✅ STATUS INDICATORS DEMO\n');
  
  const spinner = new Vortex({ text: 'Processing data...' });
  spinner.start();
  await sleep(1000);
  spinner.succeed('Data processed successfully');
  
  await sleep(300);
  
  spinner.setText('Validating input...');
  spinner.start();
  await sleep(1000);
  spinner.warn('Input validation completed with warnings');
  
  await sleep(300);
  
  spinner.setText('Connecting to database...');
  spinner.start();
  await sleep(1000);
  spinner.fail('Failed to connect to database');
  
  await sleep(300);
  
  spinner.setText('Checking system status...');
  spinner.start();
  await sleep(1000);
  spinner.info('System is running normally');
}

export async function runAllDemos(): Promise<void> {
  try {
    await basicDemo();
    await adaptiveDemo();
    await progressDemo();
    await realWorldDemo();
    await statusDemo();
    
    console.log('\n🎊 All demos completed! Vortex is ready to revolutionize your CLI experience!\n');
  } catch (error) {
    console.error('Demo failed:', error);
    process.exit(1);
  }
}

// Run demos if this file is executed directly
if (process.argv[1] && import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`) {
  runAllDemos();
}