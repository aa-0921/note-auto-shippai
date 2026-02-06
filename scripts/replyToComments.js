// scripts/replyToComments.js
// 薄いラッパー：既存のCLI引数・動作は維持しつつ、実装は共有ライブラリに委譲

import { runWithCore } from '@aa-0921/note-auto-core';

(async () => {
  await runWithCore(async ({ core, wantsBackground }) => {
    // ======================================
    // ここをカスタマイズしてください
    // ======================================
    
    // コメントへの返信の最初に入れるフレーズ配列（ランダムで1つ選択されます）
    const commentOpeningPhrases = [
      'コメント感謝です💕',
      'ありがとうございます！🌸',
      'コメント嬉しいです✨',
      'コメントをありがとうございます💕',
      'ご丁寧にコメントありがとうございます🌸',
      '温かいコメントありがとうございます✨',
      'コメント、本当にありがとうございます💕',
      'コメントいただき、ありがとうございます🌸',
      'コメントありがとうございます、励みになります✨',
      'コメントいただき、感謝しています💕',
      'コメントいただき、感謝です！🌸',
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

    // 返信の先頭/末尾に付ける固定文（必要に応じてここを編集してください）
    const commentPrefix = selectedOpeningPhrase;
    const commentSuffix =
      `${selectedSuffixOpeningPhrase}、私の他の記事にもコメント、あとフォロー・スキいただけますと大変励みになります🙇‍♀️`;

    // ベースプロンプトに追加するプロンプト（オプション）
    // 例：アカウントごとの口調（男性・女性など）を指定
    const additionalPrompt = `40代女性の口調で書いてください。
- 落ち着いた、成熟した表現を心がけてください
- 人生経験を踏まえた共感を示す表現（「私も同じ経験をしました」「お気持ち、よくわかります」など）を自然に使ってください
- 親しみやすさを保ちつつ、適度な丁寧さも大切にしてください
- 同世代への理解と共感を大切にし、経験に基づいた温かいアドバイスも含めてください
- 過度に若々しい表現は避け、でも堅苦しすぎない自然な口調を心がけてください`;

    // ベースシステムメッセージに追加するメッセージ（オプション）
    // 例：アカウントの属性（年齢、性別など）を指定
    const additionalSystemMessage = `あなたは40代の女性ユーザーです。
人生経験を積んだ落ち着いた口調で、親しみやすく温かい返信を書いてください。
同世代の悩みに共感し、経験に基づいた自然なアドバイスも含めてください。
過度に若々しい表現は避け、でも堅苦しすぎない、バランスの取れた表現を心がけてください。`;
    
    // ======================================
    
    console.log('=== コメント返信処理を開始します ===');
    console.log('');
    
    // オプション設定
    const options = {
      additionalPrompt: additionalPrompt,
      additionalSystemMessage: additionalSystemMessage,
      // AI生成本文の前後に固定文を付与（core側で付与）
      commentPrefix: commentPrefix,
      commentSuffix: commentSuffix
    };
    
    // コメント返信を実行
    const result = await core.runReplyToComments(options);
    
    console.log('');
    console.log('✅ コメント返信が完了しました');
    console.log(`総返信成功件数: ${result.replyCount}件`);
    console.log(`処理した記事数: ${result.articlesProcessed}件 / ${result.totalArticles}件`);
  });
})();
