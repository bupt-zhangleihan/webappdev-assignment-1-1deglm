// 在档案 script.js 中
// 所有的引文内容
const quotes = [
  'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.',
  'There is nothing more deceptive than an obvious fact.',
  'I ought to know by this time that when a fact appears to be opposed to a long train of deductions it invariably proves to be capable of bearing some other interpretation.',
  'I never make exceptions. An exception disproves the rule.',
  'What one man can invent another can discover.',
  'Nothing clears up a case so much as stating it to another person.',
  'Education never ends, Watson. It is a series of lessons, with the greatest for the last.',
];
// 储存单字列表及目前要输入的单字索引
let words = [];
let wordIndex = 0;
// 开始时间
let startTime = Date.now();
//标记游戏是否完成
let gameCompleted = false;
// 网页物件连结
const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
// 在 script.js 末端
document.getElementById('start').addEventListener('click', () => {
  // 取得一行引文
  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[quoteIndex];
  // 将引文分成许多单字，存在矩阵中。
  words = quote.split(' ');
  // 重制单字索引来做追踪
  wordIndex = 0;

  // 更新使用者介面
  // 建立 span 元素的矩阵，设定 class 用。
  const spanWords = words.map(function (word) { return `<span>${word} </span>` });
  // 转换成字串并以 innerHTML 显示引文
  quoteElement.innerHTML = spanWords.join('');
  // 标记第一个单字
  quoteElement.childNodes[0].className = 'highlight';
  // 清除讯息栏之前的讯息
  messageElement.innerText = '';

  // 设定文字框
  // 清除文字框
  typedValueElement.value = '';
  // 设定 focus
  typedValueElement.focus();
  // 设定事件驱动程式

  // 开始计时器
  startTime = new Date().getTime();
  gameCompleted = false;
  typedValueElement.style.visibility = 'visible';
  typedValueElement.addEventListener('input', () => {
    if (gameCompleted) return;
    // 取得目前的单字
    const currentWord = words[wordIndex];
    // 取得目前输入的数值
    const typedValue = typedValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
      // 句子最末端
      // 显示成功
      const elapsedTime = new Date().getTime() - startTime;
      const score = elapsedTime / 1000;
      const previousHighestScore = parseFloat(localStorage.getItem('highestScore')) || Infinity;
      if (score < previousHighestScore) {
        // 如果当前得分比之前的最高分更低，更新最高分
        localStorage.setItem('highestScore', score);
      }
      const message = `CONGRATULATIONS! You finished in ${score} seconds. Highest Score: ${localStorage.getItem('highestScore')} seconds.`;
      //对话框
      alert(message);

      typedValueElement.style.visibility = 'hidden'; // 将输入框设为不可见
      gameCompleted = true;
      typedValueElement.removeEventListener('input');
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      // 单字最末端
      // 清除输入的数值，准备给新的单字使用
      typedValueElement.value = '';
      // 移动到下一个单字
      wordIndex++;
      // 重设所有引文子元素的 class 名称
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }
      // 标记新单字
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      // 单字目前输入正确
      // 标记下一个单字
      typedValueElement.className = '';
    } else {
      // 单字输入错误
      typedValueElement.className = 'error';
    }
  });
});
