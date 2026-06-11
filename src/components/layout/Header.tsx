"use client";

import * as React from "react";
import Link from "next/link";
import { Zap, Menu, Search, Calculator, Wind, Snowflake, Tv, BatteryCharging, Sun, Activity, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { StateSelectionModal } from "@/components/shared/StateSelectionModal";

const popularStates = [
  { state: "Kerala", board: "KSEB", slug: "kseb" },
  { state: "Tamil Nadu", board: "TNEB", slug: "tneb" },
  { state: "Bihar", board: "BSPHCL", slug: "bsphcl" },
  { state: "West Bengal", board: "WBSEDCL", slug: "wbsedcl" },
  { state: "Uttar Pradesh", board: "UPPCL", slug: "uppcl" },
  { state: "Karnataka", board: "BESCOM", slug: "bescom" },
];

const allStatesList = [
  "Kerala", "Tamil Nadu", "Karnataka", "Bihar", "West Bengal", "Uttar Pradesh",
  "Maharashtra", "Gujarat", "Punjab", "Haryana", "Odisha", "Assam", 
  "Telangana", "Andhra Pradesh", "Rajasthan", "Delhi", "Jharkhand", "Chhattisgarh"
];

const appliances = [
  { name: "AC Calculator", slug: "ac", icon: Wind, desc: "Window & Split ACs" },
  { name: "Fan Calculator", slug: "fan", icon: Activity, desc: "Ceiling & Table fans" },
  { name: "Refrigerator Calculator", slug: "refrigerator", icon: Snowflake, desc: "Single & Double door" },
  { name: "TV Calculator", slug: "tv", icon: Tv, desc: "LED & Smart TVs" },
  { name: "EV Charging Calculator", slug: "ev", icon: BatteryCharging, desc: "Electric Vehicles" },
];

const solarTools = [
  { name: "Solar Savings Calculator", slug: "solar-savings", icon: Sun, desc: "Estimate monthly savings" },
  { name: "Solar ROI Calculator", slug: "solar-savings", icon: Calculator, desc: "Calculate payback period" },
];

export function Header() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredStates = allStatesList.filter(state => 
    state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg tracking-tight">VoltMetric India</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:text-primary transition-colors">State Calculators</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-3 gap-3 p-6 w-[700px] lg:w-[800px] bg-background/95 backdrop-blur-md rounded-xl shadow-xl shadow-primary/5">
                    
                    {/* Popular States Column */}
                    <div className="col-span-1 bg-muted/30 rounded-lg p-4">
                      <h4 className="text-sm font-semibold mb-4 text-foreground flex items-center"><MapPin className="w-4 h-4 mr-2 text-primary"/> Popular States</h4>
                      <div className="flex flex-col space-y-2">
                        {popularStates.map((item) => (
                          <Link 
                            key={item.slug}
                            href={`/calculator/${item.slug}`}
                            className="group flex flex-col p-2 rounded-md hover:bg-background hover:shadow-sm transition-all"
                          >
                            <span className="text-sm font-medium group-hover:text-primary transition-colors">{item.state}</span>
                            <span className="text-xs text-muted-foreground">{item.board}</span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* All States Columns with Search */}
                    <div className="col-span-2 flex flex-col pl-4">
                      <div className="mb-4 relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search state..." 
                          className="pl-9 bg-background shadow-sm border-muted h-9 text-sm"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <ScrollArea className="h-[280px] pr-4">
                        <div className="grid grid-cols-2 gap-2">
                          {filteredStates.map((state) => (
                            <Link 
                              key={state}
                              href={`/calculator/${state.toLowerCase().replace(/\s+/g, '')}`}
                              className="text-sm px-3 py-2 rounded-md hover:bg-muted/50 hover:text-primary transition-colors flex items-center"
                            >
                              {state}
                            </Link>
                          ))}
                          {filteredStates.length === 0 && (
                            <div className="col-span-2 text-sm text-muted-foreground text-center py-8">
                              No states found matching &quot;{searchQuery}&quot;
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </div>

                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:text-primary transition-colors">Appliances</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 bg-background/95 backdrop-blur-md rounded-xl shadow-xl shadow-primary/5">
                    {appliances.map((app) => (
                      <li key={app.slug}>
                        <Link 
                          href={`/appliances/${app.slug}`}
                          className="group flex items-center p-3 rounded-md hover:bg-muted/50 transition-colors"
                        >
                          <div className="p-2 bg-primary/10 rounded-md text-primary mr-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <app.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium leading-none mb-1 group-hover:text-primary transition-colors">{app.name}</div>
                            <p className="text-xs text-muted-foreground line-clamp-1">{app.desc}</p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:text-primary transition-colors">Solar</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4 bg-background/95 backdrop-blur-md rounded-xl shadow-xl shadow-primary/5">
                    {solarTools.map((tool, idx) => (
                      <li key={idx}>
                        <Link 
                          href={`/${tool.slug}`}
                          className="group flex flex-col p-3 rounded-md hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center mb-1">
                            <tool.icon className="h-4 w-4 mr-2 text-primary" />
                            <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">{tool.name}</div>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1 ml-6">{tool.desc}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/blog" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:text-primary transition-colors")}>
                  Blog
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link href="/faq" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:text-primary transition-colors")}>
                  FAQ
                </Link>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex">
            <StateSelectionModal>
              <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                Calculate Now
              </Button>
            </StateSelectionModal>
          </div>
          
          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 flex flex-col">
              <SheetHeader className="p-6 border-b text-left">
                <SheetTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="font-bold tracking-tight">VoltMetric India</span>
                </SheetTitle>
              </SheetHeader>
              
              <ScrollArea className="flex-1">
                <div className="p-6">
                  <Accordion className="w-full">
                    <AccordionItem value="states" className="border-b-0">
                      <AccordionTrigger className="text-base font-medium py-3 hover:no-underline">State Calculators</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-2 pl-4 py-2 border-l-2 border-muted ml-2">
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Popular</h4>
                          {popularStates.map(state => (
                            <Link key={state.slug} href={`/calculator/${state.slug}`} className="text-sm py-2 hover:text-primary transition-colors">
                              {state.state} ({state.board})
                            </Link>
                          ))}
                          <div className="my-2 border-t"></div>
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 mt-2">All States</h4>
                          {allStatesList.map(state => (
                            <Link key={state} href={`/calculator/${state.toLowerCase().replace(/\s+/g, '')}`} className="text-sm py-2 hover:text-primary transition-colors">
                              {state}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="appliances" className="border-b-0">
                      <AccordionTrigger className="text-base font-medium py-3 hover:no-underline">Appliances</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-2 pl-4 py-2 border-l-2 border-muted ml-2">
                          {appliances.map(app => (
                            <Link key={app.slug} href={`/appliances/${app.slug}`} className="text-sm py-2 hover:text-primary transition-colors flex items-center">
                              <app.icon className="h-4 w-4 mr-2 opacity-70" />
                              {app.name}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="solar" className="border-b-0">
                      <AccordionTrigger className="text-base font-medium py-3 hover:no-underline">Solar</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-2 pl-4 py-2 border-l-2 border-muted ml-2">
                          {solarTools.map((tool, idx) => (
                            <Link key={idx} href={`/${tool.slug}`} className="text-sm py-2 hover:text-primary transition-colors flex items-center">
                              <tool.icon className="h-4 w-4 mr-2 opacity-70" />
                              {tool.name}
                            </Link>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  
                  <div className="flex flex-col space-y-3 mt-4 pt-4 border-t">
                    <Link href="/blog" className="text-base font-medium py-2 hover:text-primary transition-colors">Blog</Link>
                    <Link href="/faq" className="text-base font-medium py-2 hover:text-primary transition-colors">FAQ</Link>
                  </div>
                </div>
              </ScrollArea>
              
              <div className="p-6 border-t mt-auto bg-muted/20">
                <StateSelectionModal>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                    Calculate Now
                  </Button>
                </StateSelectionModal>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
