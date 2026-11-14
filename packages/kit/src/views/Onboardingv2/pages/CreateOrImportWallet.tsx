import { useCallback } from 'react';

import { useIntl } from 'react-intl';

import { YStack, useMedia } from '@onekeyhq/components';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import { defaultLogger } from '@onekeyhq/shared/src/logger/logger';
import { EOnboardingPagesV2 } from '@onekeyhq/shared/src/routes';
import { EAccountSelectorSceneName } from '@onekeyhq/shared/types';

import { AccountSelectorProviderMirror } from '../../../components/AccountSelector';
import useAppNavigation from '../../../hooks/useAppNavigation';
import { useUserWalletProfile } from '../../../hooks/useUserWalletProfile';
import {
  OnboardingHeading,
  OnboardingIconButton,
  OnboardingPage,
} from '../components/Layout';
import { OnboardingTestIDs } from '../testIDs';

function CreateOrImportWallet() {
  const intl = useIntl();
  const navigation = useAppNavigation();
  const { isSoftwareWalletOnlyUser } = useUserWalletProfile();
  const { gtMd } = useMedia();

  const handleImportPhraseOrPrivateKey = useCallback(() => {
    navigation.push(EOnboardingPagesV2.ImportPhraseOrPrivateKey);
    defaultLogger.account.wallet.addWalletStarted({
      addMethod: 'ImportWallet',
      details: { importType: 'importPhraseOrPrivateKey' },
      isSoftwareWalletOnlyUser,
    });
  }, [navigation, isSoftwareWalletOnlyUser]);

  return (
    <OnboardingPage narrow scrollable>
      <YStack gap="$8" $gtMd={{ gap: '$12' }}>
        <OnboardingHeading>
          {intl.formatMessage({ id: ETranslations.add_existing_wallet })}
        </OnboardingHeading>
        <YStack
          gap="$3"
          $gtMd={{
            gap: '$5',
          }}
        >
          <OnboardingIconButton
            testID={OnboardingTestIDs.createOrImportWalletOptionBtn(
              'phraseOrPrivateKey',
            )}
            variant="primary"
            icon="SecretPhraseOutline"
            iconSize={gtMd ? '$5' : '$6'}
            onPress={handleImportPhraseOrPrivateKey}
          >
            {intl.formatMessage({
              id: ETranslations.import_phrase_or_private_key,
            })}
          </OnboardingIconButton>
        </YStack>
      </YStack>
    </OnboardingPage>
  );
}

function CreateOrImportWalletWithContext() {
  return (
    <AccountSelectorProviderMirror
      enabledNum={[0]}
      config={{
        sceneName: EAccountSelectorSceneName.home,
      }}
    >
      <CreateOrImportWallet />
    </AccountSelectorProviderMirror>
  );
}

export default CreateOrImportWalletWithContext;
