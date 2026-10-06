import { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Check, Copy, Link as LinkIcon, X } from 'lucide-react';
import { Link } from 'react-router-dom';

import { buildUtmUrl, normalizeUtmInput, normalizeUtmValue } from '@/lib/utm';

const LOGO_URL = '/images/logoscientiaacademy.jpeg';

const channels = [
  { label: 'LinkedIn', value: 'linkedin' },
  { label: 'Facebook', value: 'facebook' },
  { label: 'Instagram', value: 'instagram' },
  { label: 'Newsletter / e-mail', value: 'email' },
  { label: 'Inne źródło', value: 'other' },
];

function copyWithFallback(value) {
  const textarea = document.createElement('textarea');
  textarea.value = value;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();

  if (!copied) {
    throw new Error('Copy command failed');
  }
}

export default function LinkGenerator() {
  const [channel, setChannel] = useState('linkedin');
  const [customSource, setCustomSource] = useState('');
  const [campaign, setCampaign] = useState('');
  const [content, setContent] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [customSourceError, setCustomSourceError] = useState('');
  const [campaignError, setCampaignError] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const generateButtonRef = useRef(null);

  useEffect(() => {
    const previousTitle = document.title;
    const existingRobotsMeta = document.querySelector('meta[name="robots"]');
    const previousRobotsContent = existingRobotsMeta?.getAttribute('content');
    const robotsMeta = existingRobotsMeta ?? document.createElement('meta');

    document.title = 'Generator linków UTM | Scientia Academy';
    robotsMeta.setAttribute('name', 'robots');
    robotsMeta.setAttribute('content', 'noindex, nofollow');

    if (!existingRobotsMeta) {
      document.head.appendChild(robotsMeta);
    }

    return () => {
      document.title = previousTitle;
      if (existingRobotsMeta) {
        if (previousRobotsContent === null) {
          existingRobotsMeta.removeAttribute('content');
        } else {
          existingRobotsMeta.setAttribute('content', previousRobotsContent);
        }
      } else {
        robotsMeta.remove();
      }
    };
  }, []);

  const markResultAsOutdated = () => {
    setGeneratedUrl('');
    setCopyStatus('');
  };

  const handleNormalizedChange = (setter) => (event) => {
    setter(normalizeUtmValue(event.target.value));
    if (setter === setCampaign) {
      setCampaignError('');
    }
    if (setter === setCustomSource) {
      setCustomSourceError('');
    }
    markResultAsOutdated();
  };

  const handleUtmInputChange = (setter) => (event) => {
    setter(normalizeUtmInput(event.target.value));
    if (setter === setCampaign) {
      setCampaignError('');
    }
    markResultAsOutdated();
  };

  const handleChannelChange = (event) => {
    setChannel(event.target.value);
    setCustomSourceError('');
    markResultAsOutdated();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (channel === 'other' && !customSource) {
      setGeneratedUrl('');
      setCustomSourceError('Wpisz nazwę źródła.');
      return;
    }

    if (!campaign) {
      setGeneratedUrl('');
      setCampaignError('Wpisz nazwę kampanii.');
      return;
    }

    setCustomSourceError('');
    setCampaignError('');
    setCopyStatus('');
    setGeneratedUrl(buildUtmUrl({ channel, customSource, campaign, content }));
    setIsDialogOpen(true);
  };

  const handleDialogOpenChange = (isOpen) => {
    setIsDialogOpen(isOpen);
    if (!isOpen) {
      setCopyStatus('');
    }
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(generatedUrl);
      } else {
        copyWithFallback(generatedUrl);
      }
      setCopyStatus('Skopiowano');
    } catch {
      try {
        copyWithFallback(generatedUrl);
        setCopyStatus('Skopiowano');
      } catch {
        setCopyStatus('Nie udało się skopiować');
      }
    }
  };

  const fieldClassName = 'mt-2 min-h-12 w-full rounded-xl border border-border bg-secondary/40 px-4 py-3 text-base text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-4 sm:h-20 sm:px-6">
          <Link to="/" aria-label="Przejdź do strony głównej Scientia Academy">
            <img
              src={LOGO_URL}
              alt="Scientia Academy"
              className="h-11 w-auto max-w-[180px] object-contain"
            />
          </Link>
        </div>
      </header>

      <main className="px-4 py-10 sm:px-6 sm:py-14 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center sm:mb-10">
            <span className="text-sm font-medium uppercase tracking-widest text-primary">
              Narzędzie zespołu
            </span>
            <h1 className="mt-3 font-heading text-3xl tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Generator linków <span className="italic text-primary">UTM</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Generator pozwala utworzyć oznaczony link, dzięki któremu możemy później sprawdzić źródło wejścia i skuteczność poszczególnych kampanii.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            className="space-y-6 rounded-3xl border border-border/60 bg-card p-5 shadow-sm sm:p-8 md:p-10"
          >
            <div>
              <label htmlFor="publication-channel" className="block text-sm font-medium text-foreground">
                Gdzie publikujemy?
              </label>
              <select
                id="publication-channel"
                name="publication-channel"
                value={channel}
                onChange={handleChannelChange}
                className={fieldClassName}
              >
                {channels.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            {channel === 'other' && (
              <div>
                <label htmlFor="custom-source" className="block text-sm font-medium text-foreground">
                  Nazwa źródła
                </label>
                <input
                  id="custom-source"
                  name="custom-source"
                  required
                  value={customSource}
                  onChange={handleNormalizedChange(setCustomSource)}
                  aria-invalid={Boolean(customSourceError)}
                  aria-describedby={customSourceError ? 'custom-source-error' : undefined}
                  className={`${fieldClassName} ${customSourceError ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}`}
                />
                {customSourceError && (
                  <p id="custom-source-error" role="alert" className="mt-2 text-sm text-destructive">
                    {customSourceError}
                  </p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="utm-campaign" className="block text-sm font-medium text-foreground">
                Kampania
              </label>
              <input
                id="utm-campaign"
                name="utm-campaign"
                required
                value={campaign}
                onChange={handleUtmInputChange(setCampaign)}
                aria-invalid={Boolean(campaignError)}
                aria-describedby={campaignError ? 'utm-campaign-error' : 'utm-campaign-help'}
                placeholder="webinar_cra_2026"
                className={`${fieldClassName} ${campaignError ? 'border-destructive focus:border-destructive focus:ring-destructive/20' : ''}`}
              />
              {campaignError ? (
                <p id="utm-campaign-error" role="alert" className="mt-2 text-sm text-destructive">
                  {campaignError}
                </p>
              ) : (
                <p id="utm-campaign-help" className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Np. webinar_cra_2026. Spacje i znaki specjalne zostaną automatycznie uporządkowane.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="utm-content" className="block text-sm font-medium text-foreground">
                Wariant publikacji <span className="font-normal text-muted-foreground">(opcjonalnie)</span>
              </label>
              <input
                id="utm-content"
                name="utm-content"
                value={content}
                onChange={handleUtmInputChange(setContent)}
                placeholder="np. post_1, grafika_a, video_1"
                className={fieldClassName}
              />
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Pozwala rozróżnić różne posty, grafiki lub inne warianty tej samej kampanii.
              </p>
            </div>

            <button
              ref={generateButtonRef}
              type="submit"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <LinkIcon className="h-4 w-4" aria-hidden="true" />
              Generuj link
            </button>
          </form>

          <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
            Dane są przetwarzane wyłącznie w tej karcie i nie są zapisywane ani wysyłane na serwer.
          </p>
        </div>
      </main>

      <Dialog.Root open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              generateButtonRef.current?.focus();
            }}
            className="fixed left-1/2 top-1/2 z-50 grid max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 gap-4 overflow-x-hidden overflow-y-auto rounded-3xl border border-border/60 bg-card p-5 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:p-8"
          >
            <div className="pr-8 text-center sm:text-left">
              <Dialog.Title className="font-heading text-2xl text-foreground sm:text-3xl">
                Link gotowy
              </Dialog.Title>
              <Dialog.Description className="pt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Skopiuj link i użyj go w wybranej publikacji.
              </Dialog.Description>
            </div>

            <textarea
              readOnly
              value={generatedUrl}
              aria-label="Wygenerowany link UTM"
              rows={4}
              onFocus={(event) => event.target.select()}
              className="mt-2 w-full min-w-0 resize-none break-all rounded-xl border border-border bg-secondary/30 px-4 py-3 text-sm leading-relaxed text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />

            <button
              type="button"
              onClick={handleCopy}
              className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {copyStatus === 'Skopiowano' ? (
                <Check className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Copy className="h-4 w-4" aria-hidden="true" />
              )}
              {copyStatus === 'Skopiowano' ? 'Skopiowano' : 'Kopiuj link'}
            </button>
            <span aria-live="polite" className="min-h-5 text-center text-xs text-muted-foreground">
              {copyStatus === 'Nie udało się skopiować' ? copyStatus : ''}
            </span>

            <Dialog.Close
              aria-label="Zamknij"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
