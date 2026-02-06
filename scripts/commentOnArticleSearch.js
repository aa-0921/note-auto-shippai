// scripts/commentOnArticleSearch.js
// 薄いラッパー：既存のCLI引数・動作は維持しつつ、実装は共有ライブラリに委譲

import { runWithCore } from '@aa-0921/note-auto-core';

(async () => {
  await runWithCore(async ({ core, wantsBackground }) => {
    // ======================================
    // ここをカスタマイズしてください
    // ======================================
    
    // 検索ワード配列（実行のたびにランダムに選択されます）
    const searchWords = [
      'フォロバ',
      'フォロバ100',
      'フォロバ',
      'フォロバ100',
      'フォロバ',
      'フォロバ100',
      '婚活',
      '結婚',
      '恋愛',
      'マッチングアプリ',
      '出会い',
      '男性との出会い',
      '結婚できない',
      '恋人がいない',
      '独身女性',
      '婚活の悩み',
      '結婚願望',
      '理想の男性',
      '婚活疲れ',
      '結婚できない理由',
      '婚活のコツ',
      '結婚相談所',
      '婚活パーティー',
      '出会い系',
      '婚活の悩み相談',
      '40代',
      '独身',
      '再婚',
      '離婚',
      'シングル',
    ];
    
    // 最大コメント数
    // const maxComments = 5;  // 例: 5
    
    // 動作テストのため、一旦1回に
    const maxComments = 5;  // 例: 5

    // コメントの最初に入れるフレーズ配列（ランダムで1つ選択されます）
    const commentOpeningPhrases = [
      '読ませていただきました💕',
      '素敵な記事をありがとうございます🌸',
      '面白かったです✨',
      '参考になりました💕',
      '大変勉強になりました🌸',
      'おもしろいですね！✨',
      'お気持ち、よくわかります💕',
      '興味深く拝読しました🌸',
      'おもしろい内容でした✨',
    ];

    // ランダムで1つのフレーズを選択
    const selectedOpeningPhrase = commentOpeningPhrases[Math.floor(Math.random() * commentOpeningPhrases.length)];

    // コメントの最後に入れる前置きフレーズ配列（ランダムで1つ選択されます）
    const commentSuffixOpeningPhrases = [
      '💕もしよろしければ',
      '🌸よろしければ',
      '✨もし差し支えなければ',
      '💕差し支えなければ',
      '🌸もし可能でしたら',
      '✨もしお時間があれば',
      '💕もし良かったら',
      '🌸良かったら',
      '✨もしお願いできれば',
      '💕もしご都合がよろしければ',
      '🌸もしお気が向いたら',
      '✨もしお暇があれば',
      '💕お時間が許せば',
      '🌸もしお願いできましたら',
      '✨お願いできましたら',
    ];

    // ランダムで1つの前置きフレーズを選択
    const selectedSuffixOpeningPhrase = commentSuffixOpeningPhrases[Math.floor(Math.random() * commentSuffixOpeningPhrases.length)];

    // コメントの挨拶・フォロー・スキ告知フレーズ配列（ランダムで1つ選択されます）
    const commentGreetingPhrases = [
      'コメントさせていただきます💕フォロー・スキもさせていただきました🌸',
      'コメントさせていただきます✨フォローとスキもいたしました💕',
      'コメント失礼します🌸フォロー・スキも💕',
      '拝見してコメントしました💕フォロー・スキもさせていただきました🌸',
      'フォロー・スキさせていただきました🌸コメントさせていただきます💕',
      'フォロー・スキもさせていただきました✨コメントさせていただきます💕',
      'フォローとスキもしました💕コメントさせていただきます🌸',
    ];

    const selectedGreetingPhrase = commentGreetingPhrases[Math.floor(Math.random() * commentGreetingPhrases.length)];

    // コメントの末尾に入れる締めフレーズ配列（ランダムで1つ選択されます）
    const commentSuffixClosingPhrases = [
      '私の記事にもコメント・フォロー・スキをいただけますと大変励みになります🙇‍♀️',
      '私の記事にもコメント・フォロー・スキいただけると嬉しいです💕',
      '私の方の記事にもスキやフォロー・コメントいただけたら励みになります🌸',
      '私の記事へもコメント・フォロー・スキいただけると大変ありがたいです✨',
      '私のブログにもコメント・フォロー・スキいただけますと幸いです🙇‍♀️',
      '私の記事にもフォロー・スキ・コメントいただけると大変嬉しいです💕',
      '私の記事へもコメント・フォロー・スキいただけたらありがたいです🌸',
    ];

    const selectedSuffixClosingPhrase = commentSuffixClosingPhrases[Math.floor(Math.random() * commentSuffixClosingPhrases.length)];

    // コメントの先頭/末尾に付ける固定文（必要に応じてここを編集してください）
    const commentPrefix = `${selectedOpeningPhrase} ${selectedGreetingPhrase}`;
    const commentSuffix =
      `${selectedSuffixOpeningPhrase}、アイコンかアカウント名のところをクリックして、${selectedSuffixClosingPhrase}`;
    
    // コメント生成用のプロンプト（オプション、指定しない場合はデフォルトを使用）
    // プロンプト内で以下の変数を使用可能: {{title}}, {{headings}}, {{articleText}}
    const commentPrompt = undefined;  // デフォルトを使用する場合は undefined
    // 例: `以下の記事を読んで、適切なコメントを生成してください。\n\nタイトル: {{title}}\n見出し: {{headings}}\n本文: {{articleText}}`
    
    // コメント生成用のシステムメッセージ（オプション、指定しない場合はデフォルトを使用）
    // 完全に上書きする場合に使用（通常は additionalSystemMessage を使用することを推奨）
    const commentSystemMessage = undefined;  // デフォルトを使用する場合は undefined
    
    // ベースプロンプトに追加するプロンプト（オプション）
    // 例：アカウントごとの口調（男性・女性など）を指定
    const additionalPrompt = `40代女性の口調で書いてください。
- 落ち着いた、成熟した表現を心がけてください
- 人生経験を踏まえた共感を示す表現（「私も同じ経験をしました」「お気持ち、よくわかります」など）を自然に使ってください
- 親しみやすさを保ちつつ、適度な丁寧さも大切にしてください
- 同世代への理解と共感を大切にし、経験に基づいた温かいアドバイスも含めてください
- 過度に若々しい表現は避け、でも堅苦しすぎない自然な口調を心がけてください
`;


    // ベースシステムメッセージに追加するメッセージ（オプション）
    // 例：アカウントの属性（年齢、性別など）を指定
    const additionalSystemMessage = `あなたは40代の女性ユーザーです。
人生経験を積んだ落ち着いた口調で、親しみやすく温かいコメントを書いてください。
同世代の悩みに共感し、経験に基づいた自然なアドバイスも含めてください。
過度に若々しい表現は避け、でも堅苦しすぎない、バランスの取れた表現を心がけてください。`;
    
    // ======================================
    
    console.log('=== 記事検索とコメント投稿処理を開始します ===');
    console.log('検索ワード配列:', searchWords);
    console.log('最大コメント数:', maxComments);
    console.log('');
    
    // オプション設定
    const options = {
      searchWords: searchWords,
      maxComments: maxComments,
      commentPrompt: commentPrompt,
      commentSystemMessage: commentSystemMessage,
      additionalPrompt: additionalPrompt,
      additionalSystemMessage: additionalSystemMessage,
      // AI生成本文の前後に固定文を付与（core側で付与）
      commentPrefix: commentPrefix,
      commentSuffix: commentSuffix
    };
    
    // 記事検索とコメント投稿を実行
    await core.runCommentOnArticleSearch(options);
    
    console.log('');
    console.log('✅ コメント投稿が完了しました');
  });
})();
