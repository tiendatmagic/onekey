import { useCallback, useState } from 'react';

import { useRoute } from '@react-navigation/core';
import { useIntl } from 'react-intl';

import {
  Icon,
  Input,
  SizableText,
  Toast,
  XStack,
  YStack,
  useMedia,
} from '@onekeyhq/components';
import { ETranslations } from '@onekeyhq/shared/src/locale';
import { defaultLogger } from '@onekeyhq/shared/src/logger/logger';
import type { IOnboardingParamListV2 } from '@onekeyhq/shared/src/routes';
import { EOnboardingPagesV2 } from '@onekeyhq/shared/src/routes';
import { EAccountSelectorSceneName } from '@onekeyhq/shared/types';

import backgroundApiProxy from '../../../background/instance/backgroundApiProxy';
import { AccountSelectorProviderMirror } from '../../../components/AccountSelector';
import useAppNavigation from '../../../hooks/useAppNavigation';
import {
  OnboardingHeading,
  OnboardingIconButton,
  OnboardingPage,
} from '../components/Layout';
import { OnboardingTestIDs } from '../testIDs';

import type { RouteProp } from '@react-navigation/core';

function CreateNewWallet() {
  const intl = useIntl();
  const navigation = useAppNavigation();
  const route =
    useRoute<
      RouteProp<IOnboardingParamListV2, EOnboardingPagesV2.CreateNewWallet>
    >();

  const [showPassphrase, setShowPassphrase] = useState(false);
  const [passphrase, setPassphrase] = useState('');
  const [confirmPassphrase, setConfirmPassphrase] = useState('');
  const [isPassphraseSecure, setIsPassphraseSecure] = useState(true);
  const [isConfirmSecure, setIsConfirmSecure] = useState(true);

  const { gtMd } = useMedia();

  const handleCreateSeedPhraseWallet = useCallback(async () => {
    if (showPassphrase) {
      if (!passphrase) {
        Toast.error({
          title: 'Please enter a passphrase',
        });
        return;
      }
      if (passphrase !== confirmPassphrase) {
        Toast.error({
          title: 'Passphrase does not match',
        });
        return;
      }
    }

    const mnemonic = await backgroundApiProxy.serviceAccount.generateMnemonic();
    const encodedMnemonic =
      await backgroundApiProxy.servicePassword.encodeSensitiveText({
        text: mnemonic,
      });

    let encodedPassphrase: string | undefined;
    if (showPassphrase && passphrase) {
      encodedPassphrase =
        await backgroundApiProxy.servicePassword.encodeSensitiveText({
          text: passphrase,
        });
    }

    const hasCachedPassword =
      await backgroundApiProxy.servicePassword.hasCachedPassword();
    if (hasCachedPassword) {
      navigation.push(EOnboardingPagesV2.FinalizeWalletSetup, {
        mnemonic: encodedMnemonic,
        passphrase: encodedPassphrase,
        isWalletBackedUp: false,
      });
      defaultLogger.account.wallet.onboard({ onboardMethod: 'createWallet' });
      return;
    }
    navigation.push(EOnboardingPagesV2.CreatePasscode, {
      mnemonic: encodedMnemonic,
      passphrase: encodedPassphrase,
      isWalletBackedUp: false,
    });
  }, [confirmPassphrase, navigation, passphrase, showPassphrase]);

  return (
    <OnboardingPage narrow scrollable>
      <YStack gap="$8" $gtMd={{ gap: '$12' }}>
        <OnboardingHeading>
          {intl.formatMessage({
            id: ETranslations.onboarding_create_new_wallet,
          })}
        </OnboardingHeading>
        <YStack
          gap="$3"
          $gtMd={{
            gap: '$5',
          }}
        >
          <OnboardingIconButton
            testID={OnboardingTestIDs.createNewWalletSeedPhraseBtn}
            variant="primary"
            icon="SecretPhraseOutline"
            iconSize={gtMd ? '$5' : '$6'}
            onPress={handleCreateSeedPhraseWallet}
          >
            {intl.formatMessage({
              id: ETranslations.create_seed_phrase_wallet,
            })}
          </OnboardingIconButton>
          <YStack pt="$2" px="$1" gap="$2">
            <XStack
              alignItems="center"
              gap="$2"
              cursor="pointer"
              onPress={() => setShowPassphrase(!showPassphrase)}
              userSelect="none"
            >
              <Icon
                name={
                  showPassphrase
                    ? 'ChevronDownSmallOutline'
                    : 'ChevronRightSmallOutline'
                }
                size="$4"
                color="$iconSubdued"
              />
              <SizableText size="$bodyMdMedium" color="$textSubdued">
                Advanced: BIP-39 Passphrase (Optional)
              </SizableText>
            </XStack>
            {showPassphrase ? (
              <YStack gap="$2" pt="$1">
                <Input
                  placeholder="Enter passphrase"
                  value={passphrase}
                  onChangeText={setPassphrase}
                  secureTextEntry={isPassphraseSecure}
                  addOns={[
                    {
                      iconName: isPassphraseSecure ? 'EyeOutline' : 'EyeOffOutline',
                      onPress: () => setIsPassphraseSecure(!isPassphraseSecure),
                      testID: `create-passphrase-eye-${isPassphraseSecure ? 'off' : 'on'}`,
                    },
                  ]}
                  testID="create-passphrase-input"
                />
                <Input
                  placeholder="Confirm passphrase"
                  value={confirmPassphrase}
                  onChangeText={setConfirmPassphrase}
                  secureTextEntry={isConfirmSecure}
                  addOns={[
                    {
                      iconName: isConfirmSecure ? 'EyeOutline' : 'EyeOffOutline',
                      onPress: () => setIsConfirmSecure(!isConfirmSecure),
                      testID: `create-confirm-passphrase-eye-${isConfirmSecure ? 'off' : 'on'}`,
                    },
                  ]}
                  testID="create-confirm-passphrase-input"
                />
                <SizableText size="$bodyXs" color="$textCaution">
                  Warning: Passphrase creates an independent hidden wallet. If forgotten, your funds cannot be recovered!
                </SizableText>
              </YStack>
            ) : null}
          </YStack>
        </YStack>
      </YStack>
    </OnboardingPage>
  );
}

function CreateNewWalletWithContext() {
  return (
    <AccountSelectorProviderMirror
      enabledNum={[0]}
      config={{
        sceneName: EAccountSelectorSceneName.home,
      }}
    >
      <CreateNewWallet />
    </AccountSelectorProviderMirror>
  );
}

export default CreateNewWalletWithContext;
