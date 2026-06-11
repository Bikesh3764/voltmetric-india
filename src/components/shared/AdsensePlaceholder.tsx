export function AdsensePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full bg-muted/20 border border-dashed border-border/50 rounded-lg flex items-center justify-center p-4 text-muted-foreground text-sm min-h-[100px] ${className}`}>
      {/* 
        This is a placeholder for Google Adsense.
        To implement, replace this with the actual <ins> tag provided by Adsense
        and make sure to load the adsbygoogle script in your layout or page.
      */}
      Advertisement Space
    </div>
  );
}
