
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

interface PricingTier {
  name: string;
  price: string;
  priceFrequency: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  isPopular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Community Access",
    price: "Free",
    priceFrequency: "for Alumni",
    description: "Basic access for all registered and verified alumni.",
    features: [
      "View Alumni Feed",
      "Search Alumni Directory",
      "Access Notice Board",
      "View Job Postings",
      "Basic Profile",
      "Limited Messaging",
    ],
    buttonText: "Sign Up",
    buttonLink: "/signup",
  },
  {
    name: "College Portal",
    price: "₹4999",
    priceFrequency: "/ month",
    description: "For college administrations to manage their dedicated alumni portal.",
    features: [
      "Dedicated College Portal",
      "Admin Dashboard",
      "User Management & Approvals",
      "Post as Admin (Announcements, Events)",
      "Basic Analytics",
      "Custom Branding Options",
      "Email Support",
    ],
    buttonText: "Get Started",
    buttonLink: "/admin/signup", // Placeholder for admin signup/contact
    isPopular: true,
  },
  {
    name: "Enterprise Plan",
    price: "Custom",
    priceFrequency: "for Institutions",
    description: "Tailored solutions for larger institutions or multiple colleges.",
    features: [
      "All College Portal Features",
      "Advanced Analytics & Reporting",
      "Data Export Capabilities",
      "Payment & Subscription Management Tools",
      "Integration Options (e.g., CRM)",
      "Dedicated Account Manager",
      "Priority Support",
    ],
    buttonText: "Contact Sales",
    buttonLink: "/contact-sales", // Placeholder for contact page
  },
];

export default function PricingSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Pricing Plans
          </h2>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Choose the plan that best fits your needs. Free access for individual alumni, and tailored plans for college administrations.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {pricingTiers.map((tier) => (
            <Card key={tier.name} className={`flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 ${tier.isPopular ? 'border-primary border-2 relative' : ''}`}>
              {tier.isPopular && (
                <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  Popular
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription className="text-sm">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-6">
                <div>
                  <span className="text-4xl font-bold">{tier.price}</span>
                  <span className="text-muted-foreground">{tier.priceFrequency}</span>
                </div>
                <ul className="space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto pt-6">
                <Link href={tier.buttonLink} className="w-full">
                  <Button className="w-full" variant={tier.isPopular ? "default" : "outline"}>
                    {tier.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
