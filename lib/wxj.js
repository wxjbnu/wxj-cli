#! node

'use strict';

const co = require('co');
const program = require('commander');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

const notifier = updateNotifier({
  pkg,
  callback: function (error, update) {
    if (update && ['major', 'minor', 'patch'].indexOf(update.type) > -1) {
      notifier.update = update;
      notifier.notify({
        defer: false
      });
    }
  }
});


program
  .version(pkg.version);

program
  .command('create <name>')
  .alias('c')
  .description('创建新项目')
  .action((name, options) => {
    // require('./create')(name, options);
    console.log('创建新项目: '+name)
  });

// program
//   .command('generate <type> <name>')
//   .alias('g')
//   .description('创建新组件、页面、Redux、Saga等等')
//   .option('--work-dir [dir]', '工作目录，默认为当前目录')
//   .option('--config [file]', '配置文件，默认为.labrador')
//   .option('--src-dir [dir]', '源码目录，默认为工作目录下的src文件夹')
//   .option('--scss', '使用scss，默认为less')
//   .action((type, name, options) => {
//     switch (type) {
//       case 'page':
//         require('./generate-page')(name, options);
//         return;
//       case 'component':
//         require('./generate-component')(name, options);
//         return;
//       case 'redux':
//         require('./generate-redux')(name, options);
//         return;
//       case 'saga':
//         require('./generate-saga')(name, options);
//         return;
//     }
//     console.log('Unknown type to generate');
//   });


program.parse(process.argv);

if (!program.args.length) program.help();
