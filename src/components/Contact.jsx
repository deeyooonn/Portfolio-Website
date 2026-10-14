import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import CardCollection from './cards/CardCollection';
import InfoContent from './cards/InfoContent';
import { contactCards, EMAIL, GITHUB_URL } from '../data/collections';
function EmailContact() {
  const [status, setStatus] = useState('idle');
  const timer = useRef(null), mounted = useRef(false), emailRef = useRef(null), attempt = useRef(0);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; clearTimeout(timer.current); }; }, []);
  const handleCopy = async () => {
    clearTimeout(timer.current);
    const currentAttempt = ++attempt.current;
    let success = false;
    try { await navigator.clipboard.writeText(EMAIL); success = true; } catch {
      const input = document.createElement('textarea');
      input.value = EMAIL; input.setAttribute('aria-hidden', 'true'); input.style.cssText = 'position:fixed;left:-9999px;top:0';
      const previous = document.activeElement;
      document.body.append(input); input.select();
      try { success = document.execCommand('copy'); } catch { success = false; }
      input.remove(); previous?.focus({ preventScroll: true });
    }
    if (!mounted.current || currentAttempt !== attempt.current) return;
    setStatus(success ? 'copied' : 'failed');
    if (!success) { const range = document.createRange(); range.selectNodeContents(emailRef.current); const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); }
    if (success) timer.current = setTimeout(() => setStatus('idle'), 1500);
  };
  return <div className="contact-content">
    <div className="contact-list">
      <div className="contact-row"><a className="contact-link" href={`mailto:${EMAIL}`}><span className="contact-label">Email</span><span ref={emailRef} className="contact-email">{EMAIL}</span></a><button type="button" className="copy-button" aria-label="Copy email address" onClick={handleCopy}>{status === 'copied' ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}<span>{status === 'copied' ? 'Copied' : 'Copy'}</span></button></div>
    </div>
    <p aria-live="polite" className={status === 'failed' ? 'copy-feedback' : 'sr-only'}>{status === 'copied' ? 'Email copied to clipboard' : status === 'failed' ? 'Copy failed. Please copy the email address manually.' : ''}</p>
  </div>;
}

export default function Contact() {
  return <CardCollection sectionId="contact" title="Contact" items={contactCards} renderDetail={item =>
    <InfoContent item={item} sectionId="contact">
      {item.id === 'email' ? <EmailContact /> : <div className="project-links"><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">Visit GitHub profile<ArrowUpRight size={15} aria-hidden="true" /></a></div>}
    </InfoContent>
  } />;
}
