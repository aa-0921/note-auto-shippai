#!/usr/bin/env node
// scripts/twitterPostAmazonWishlistRanking.js
// AmazonウィッシュリストランキングリンクをTwitterに投稿する（薄いラッパ）

import { Logger, postRandomAmazonWishlistRankingTweet } from '@aa-0921/note-auto-core';
import { amazonWishlistRankingLinks } from './affiliateConfig.js';
import dotenv from 'dotenv';

dotenv.config();

const logger = new Logger();

async function main() {
  const viewportWidth = parseInt(process.env.TWITTER_SS_WIDTH || '1600', 10);
  const viewportHeight = parseInt(process.env.TWITTER_SS_HEIGHT || '900', 10);
  const zoom = parseFloat(process.env.TWITTER_SS_ZOOM || '1.0');
  const dryrun = process.argv.includes('--dryrun');

  logger.info('========================================');
  logger.info('Amazonウィッシュリストランキング Twitter投稿（coreサービス使用）');
  logger.info('========================================');
  logger.info('');

  await postRandomAmazonWishlistRankingTweet({
    links: amazonWishlistRankingLinks,
    dryrun,
    viewportWidth,
    viewportHeight,
    zoom,
    logger,
  });
}

main().catch(() => process.exit(1));
