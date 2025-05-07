export default function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t border-border/40 mt-12">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="text-balance text-center text-xs leading-loose text-muted-foreground md:text-left space-y-1">
          <p>
            <strong>Disclaimer:</strong> This is an unofficial alumni platform for Government College of Engineering &amp; Leather Technology (GCELT) and is maintained by students/alumni independently.
          </p>
          <p>
            This platform does not impersonate GCELT or any official body. All content and interactions are user-generated and the responsibility of the respective users.
            The platform administrators are not liable for any misinformation or misuse. Use of this platform is at your own risk.
          </p>
           <p className="mt-2">
            © {new Date().getFullYear()} Alumnilink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
