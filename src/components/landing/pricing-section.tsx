
'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface PricingTier {
  name: string;
  monthlyPriceNumeric: number; // Base monthly price as a number
  priceDisplayMonthly: string; // e.g., "₹5,000" for display
  description: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  isPopular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Small",
    monthlyPriceNumeric: 5000,
    priceDisplayMonthly: "₹5,000",
    description: "Ideal for small communities, supporting up to 5,000 alumni.",
    features: [
      "Dedicated College Portal",
      "Admin Dashboard Access",
      "User Management (up to 5K)",
      "Post as Admin (Announcements, Events)",
      "Basic Analytics",
      "Standard Support",
    ],
    buttonText: "Choose Small",
    buttonLink: "/signup/college", 
  },
  {
    name: "College",
    monthlyPriceNumeric: 30000,
    priceDisplayMonthly: "₹30,000",
    description: "Perfect for college-wide networks, supporting up to 100,000 alumni.",
    features: [
      "All Small Plan Features",
      "Advanced User Management (up to 100K)",
      "Enhanced Analytics & Reporting",
      "Custom Branding Options",
      "Priority Email Support",
      "Data Export Options",
    ],
    buttonText: "Choose College",
    buttonLink: "/signup/college", 
    isPopular: true,
  },
  {
    name: "University", 
    monthlyPriceNumeric: 100000,
    priceDisplayMonthly: "₹100,000",
    description: "Comprehensive solution for university-scale needs, supporting up to 1 million alumni.",
    features: [
      "All College Plan Features",
      "Extensive User Management (up to 1M)",
      "Full Analytics Suite",
      "Payment & Subscription Tools Integration",
      "API Access (Optional)",
      "Dedicated Account Manager",
      "24/7 Priority Support",
    ],
    buttonText: "Choose University", // Changed from "Contact Sales" as per previous iteration resulting in numeric price
    buttonLink: "/signup/college", // Placeholder
  },
];

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Pricing Plans for Institutions
          </h2>
          <p className="max-w-3xl text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Choose the plan that best fits your institution's needs. Individual alumni access remains free.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-3 mb-10">
          <Label htmlFor="billing-toggle" className={!isYearly ? 'text-primary font-semibold' : 'text-muted-foreground'}>
            Monthly
          </Label>
          <Switch
            id="billing-toggle"
            checked={isYearly}
            onCheckedChange={setIsYearly}
            aria-label="Toggle billing frequency"
          />
          <Label htmlFor="billing-toggle" className={isYearly ? 'text-primary font-semibold' : 'text-muted-foreground'}>
            Yearly 
            <Badge variant="outline" className="ml-1.5 bg-green-100 text-green-700 border-green-300 dark:bg-green-800 dark:text-green-200 dark:border-green-600 text-xs">
              Save 10%
            </Badge>
          </Label>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {pricingTiers.map((tier) => {
            let displayPrice = tier.priceDisplayMonthly;
            let priceFrequency = "/ month";

            if (isYearly && tier.monthlyPriceNumeric) {
              const yearlyRaw = tier.monthlyPriceNumeric * 12;
              const discountedYearly = yearlyRaw * 0.9;
              displayPrice = `₹${discountedYearly.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
              priceFrequency = "/ year";
            } else if (!tier.monthlyPriceNumeric) { // For "Contact Sales" type plans if any
                 displayPrice = tier.priceDisplayMonthly; // Show text like "Contact Sales"
                 priceFrequency = ""; // No frequency needed
            }


            return (
              <Card key={tier.name} className={`flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 ${tier.isPopular ? 'border-primary border-2 relative' : ''}`}>
                {tier.isPopular && (
                  <Badge variant="default" className="absolute top-0 right-0 -mt-3 -mr-3 shadow-md">
                    Popular
                  </Badge>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <CardDescription className="text-sm h-10">{tier.description}</CardDescription> 
                </CardHeader>
                <CardContent className="flex-grow space-y-6">
                  <div>
                    <span className="text-4xl font-bold">{displayPrice}</span>
                    <span className="text-muted-foreground">{priceFrequency}</span>
                  </div>
                  <ul className="space-y-2">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
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
            );
          })}
        </div>
         <div className="mt-12 text-center">
            <p className="text-muted-foreground">
                Individual alumni can <Link href="/signup" className="text-primary hover:underline font-semibold">sign up for free</Link> to access the community features.
            </p>
        </div>
      </div>
    </section>
  );
}
