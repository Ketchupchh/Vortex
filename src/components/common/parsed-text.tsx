type ParsedTextProps = {
  text: string;
  className?: string;
}

export function ParsedText({ text, className } : ParsedTextProps) : JSX.Element
{

  function sanitize(string: string)
  {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
    };
    const reg = /<(?!\/?a(?=>|\s.*>))\/?[^\s>]+(?:\s[^>]+)?\s*\/?>/gi;
    return string.replace(reg, (match: string) => {
      return match.replace(/[&<>"'/]/g, (char) => map[char]);
    });
  }

  function replaceMentionsWithLinks(text: string): string {
    const mentionRegex = /@(\w+)/g;
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const replacedText = text.replace(mentionRegex, (match, mention) => {
      return `<a class="mention" href="/user/${mention}" onClick="event.stopPropagation(); ">@${mention}</a>`;
    });

    const urlsReplacedText = replacedText.replace(urlRegex, (match, url) => {
      return `<a class="mention" href="${url}" target="_blank" rel="noopener noreferrer" onClick="event.stopPropagation();">${url}</a>`;
    });
    return sanitize(urlsReplacedText);
  }

  const NewParsedText: React.FC = () => {
    const processedText = replaceMentionsWithLinks(text);

    return (
      <div className={className} dangerouslySetInnerHTML={{ __html: processedText }} />
    );
  };

  return (
    <NewParsedText />
  );
}