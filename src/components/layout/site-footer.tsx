
'use client';

import { Linkedin, Twitter, Facebook, Copyright, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function SiteFooter() {
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const disclaimerText = (
    <>
      <p>
        <strong>Disclaimer:</strong> This is an unofficial alumni platform for Government College of Engineering &amp; Leather Technology (GCELT) and is maintained by students/alumni independently.
      </p>
      <p>
        This platform does not impersonate GCELT or any official body. All content and interactions are user-generated and the responsibility of the respective users.
        The platform administrators are not liable for any misinformation or misuse. Use of this platform is at your own risk.
      </p>
    </>
  );

  return (
    <footer className="py-6 md:px-8 md:py-0 border-t border-border/40 mt-12">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="text-balance text-center text-xs leading-loose text-muted-foreground md:text-left space-y-1">
          <Dialog open={isDisclaimerOpen} onOpenChange={setIsDisclaimerOpen}>
            <DialogTrigger asChild>
              <Button variant="link" className="text-xs p-0 h-auto text-muted-foreground hover:text-primary">
                <AlertTriangle className="h-3 w-3 mr-1" /> Disclaimer
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-primary" /> Disclaimer
                </DialogTitle>
              </DialogHeader>
              {/* Replaced DialogDescription with a div to allow block content (multiple p tags) */}
              <div className="space-y-2 text-sm text-muted-foreground py-2">
                {disclaimerText}
              </div>
            </DialogContent>
          </Dialog>
           <p className="mt-2 flex items-center justify-center md:justify-start">
            <Copyright className="h-3 w-3 mr-1" /> {new Date().getFullYear()} Alumnilink. All rights reserved.
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="h-5 w-5" />
          </Link>
          <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
            <Facebook className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}

