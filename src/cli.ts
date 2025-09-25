#!/usr/bin/env node

import { Vortex, spinners } from './index.js';

function showHelp(): void {
  console.log(`
🌪️  Vortex CLI Spinner

Usage:
  vortex [options] [text]

Options:
  --spinner, -s    Spinner type (vortex, wave, pulse, geometric, matrix, dna, etc.)
  --color, -c      Spinner color
  --time, -t       Duration in seconds (default: 3)
  --predictive, -p Enable progress prediction
  --demo, -d       Run demo showcase
  --list, -l       List available spinners
  --help, -h       Show this help

Examples:
  vortex "Loading data..."
  vortex -s wave -c blue "Processing files..."
  vortex -p -t 10 "Installing packages..."
  vortex --demo
`);
}

function listSpinners(): void {
  console.log('\n🎨 Available Spinners:\n');
  Object.keys(spinners).forEach(name => {
    console.log(`  ${name.padEnd(12)} ${spinners[name].frames.slice(0, 4).join(' ')}`);
  });
  console.log('');
}

async function runDemo(): Promise<void> {
  const { runAllDemos } = await import('./demo.js');
  await runAllDemos();
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }
  
  if (args.includes('--list') || args.includes('-l')) {
    listSpinners();
    return;
  }
  
  if (args.includes('--demo') || args.includes('-d')) {
    await runDemo();
    return;
  }
  
  // Parse arguments
  let text = 'Loading...';
  let spinnerType = 'vortex';
  let color = 'cyan';
  let duration = 3;
  let predictive = false;
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--spinner' || arg === '-s') {
      spinnerType = args[++i] || spinnerType;
    } else if (arg === '--color' || arg === '-c') {
      color = args[++i] || color;
    } else if (arg === '--time' || arg === '-t') {
      duration = parseInt(args[++i]) || duration;
    } else if (arg === '--predictive' || arg === '-p') {
      predictive = true;
    } else if (!arg.startsWith('-')) {
      text = arg;
    }
  }
  
  // Create and run spinner
  const spinner = new Vortex({
    text,
    spinner: spinners[spinnerType] || spinners.vortex,
    color,
    predictive
  });
  
  spinner.start();
  
  if (predictive) {
    // Simulate progress for predictive mode
    const steps = 20;
    for (let i = 0; i <= steps; i++) {
      spinner.updateProgress(i, steps);
      await new Promise(resolve => setTimeout(resolve, (duration * 1000) / steps));
    }
  } else {
    await new Promise(resolve => setTimeout(resolve, duration * 1000));
  }
  
  spinner.succeed('Completed!');
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});