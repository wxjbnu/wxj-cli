#! node

'use strict';

// const co = require('co');
const program = require('commander');
const updateNotifier = require('update-notifier');
const pkg = require('../package.json');

// 以下只有create命令用到
require('colors');
const path = require('path');
const download = require('download-github-repo');

// 结束引入

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
  .command('test <name>')
  .alias('t')
  .description('测试的cli')
  .action((name, options) => {
    // require('./create')(name, options);
    console.log('测试的新项目: '+name)
  });

program
  .command('create <template> <name>')
  .alias('c')
  .description('下载模板')
  .action((template, name, options) => {
    // require('./create')(name, options);
    let rootDir = path.join(process.cwd(), name);
    // try {
    //   return fs.statSync(rootDir).isDirectory();
    // } catch (e) {
    //   console.error(`项目创建失败："${rootDir}" 已经存在`.red);
    //   process.exit();
    // }
    console.log('下载初始项目...'.green);
    download(template, rootDir, (err) => {
        console.log('下载完毕'.green);
    })
  });
  program
    .command('new <name>')
    .alias('n')
    .description('创建新项目并下载模板')
    .action((name, options) => {
      // require('./create')(name, options);
      let rootDir = path.join(process.cwd(), name);
      // try {
      //   return fs.statSync(rootDir).isDirectory();
      // } catch (e) {
      //   console.error(`项目创建失败："${rootDir}" 已经存在`.red);
      //   process.exit();
      // }
      console.log('下载初始项目...'.green);
      download('wxjbnu/wxj-template', rootDir, (err) => {
          console.log('下载完毕'.green);
      })
    });

  program
    .command('build')
    .alias('b')
    .description('编译文件')
    .action(() => {
      require('./build')();
      console.log('编译完成')
    });
  // program
  //   .command('build')
  //   .alias('b')
  //   .description('编译文件')
  //   .action(() => {
  //     if (!util.isDir(path.join(util.currentDir, 'node_modules'))) {
  //         util.error('请先执行npm install安装所需依赖', '错误');
  //         return;
  //     } else {
  //         compile.build(commander);
  //     }
  //   });

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
