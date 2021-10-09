import { targetTypes } from './options';

const getValidTargetType = (searchParams: URLSearchParams) => {
  let targetType = searchParams.get('target');
  if (!targetType) return null;

  if (!targetTypes.hasOwnProperty(targetType)) {
    const version = searchParams.get('ver');
    if (!version) return null;

    targetType = `${targetType}&ver=${version}`;
    if (!targetTypes.hasOwnProperty(targetType)) return null;
  }

  return targetType;
};

interface SubscriptionConfig {
  backendUrl: string;
  targetType: string;
  sourceUrls: string;
  ruleUrl: string;
  filename?: string;
  enableUdp?: string;
}

type SelectiveSubscriptionConfig = {
  [K in keyof SubscriptionConfig]?: SubscriptionConfig[K];
};

const dumpSubscriptionUrl = ({
  backendUrl,
  targetType,
  sourceUrls,
  ruleUrl,
  filename,
  enableUdp
}: SubscriptionConfig) => {
  const encodedSourceUrls = encodeURIComponent(
    sourceUrls
      .split(/[\n|]/)
      .map((url) => url.trim())
      .filter((url) => url)
      .join('|')
  );
  const encodedRuleUrl = encodeURIComponent(ruleUrl);

  let subscriptionUrl = `${backendUrl}?target=${targetType}&url=${encodedSourceUrls}&config=${encodedRuleUrl}`;

  if (filename) subscriptionUrl += `&filename=${filename}`;
  if (enableUdp) subscriptionUrl += `&udp=${enableUdp}`;

  return subscriptionUrl;
};

const loadSubscriptionUrl = (subscriptionUrl: string) => {
  const url = new URL(subscriptionUrl);
  const searchParams = url.searchParams;

  const config: SelectiveSubscriptionConfig = {
    backendUrl: `${url.origin}${url.pathname}`
  };

  const targetType = getValidTargetType(searchParams);
  if (targetType) config.targetType = targetType;

  const sourceUrls = searchParams.get('url')?.replaceAll('|', '\n');
  if (sourceUrls) config.sourceUrls = sourceUrls;

  const ruleUrl = searchParams.get('config');
  if (ruleUrl) config.ruleUrl = ruleUrl;

  const filename = searchParams.get('filename');
  if (filename) config.filename = filename;

  const enableUdp = searchParams.get('udp');
  if (enableUdp === 'true' || enableUdp === 'false')
    config.enableUdp = enableUdp;

  return config;
};

export type { SubscriptionConfig, SelectiveSubscriptionConfig };
export { dumpSubscriptionUrl, loadSubscriptionUrl };
