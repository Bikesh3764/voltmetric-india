"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const STATE_BOARDS = [
  { state: "Kerala", board: "KSEB", slug: "kseb" },
  { state: "Tamil Nadu", board: "TNEB", slug: "tneb" },
  { state: "Bihar", board: "BSPHCL", slug: "bsphcl" },
  { state: "West Bengal", board: "WBSEDCL", slug: "wbsedcl" },
  { state: "Uttar Pradesh", board: "UPPCL", slug: "uppcl" },
  { state: "Karnataka", board: "BESCOM", slug: "bescom" },
  { state: "Maharashtra", board: "MSEDCL", slug: "msedcl" },
  { state: "Punjab", board: "PSPCL", slug: "pspcl" },
  { state: "Andhra Pradesh", board: "APSPDCL", slug: "apspdcl" },
  { state: "Telangana", board: "TSSPDCL", slug: "tsspdcl" },
  { state: "Gujarat", board: "GUVNL", slug: "gujarat" },
  { state: "Haryana", board: "DHBVN", slug: "haryana" },
  { state: "Odisha", board: "TPCODL", slug: "odisha" },
  { state: "Assam", board: "APDCL", slug: "assam" },
  { state: "Rajasthan", board: "JVVNL", slug: "rajasthan" },
  { state: "Delhi", board: "BSES", slug: "delhi" },
  { state: "Jharkhand", board: "JBVNL", slug: "jharkhand" },
  { state: "Chhattisgarh", board: "CSPDCL", slug: "chhattisgarh" },
];

export function StateSelectionModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [comboboxOpen, setComboboxOpen] = React.useState(false);
  const [selectedStateSlug, setSelectedStateSlug] = React.useState("");

  const selectedState = STATE_BOARDS.find((s) => s.slug === selectedStateSlug);

  const handleContinue = () => {
    if (selectedState) {
      setOpen(false);
      router.push(`/calculator/${selectedState.slug}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<span className="inline-block" />}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <MapPin className="mr-2 h-5 w-5 text-primary" />
            Select Your State
          </DialogTitle>
          <DialogDescription>
            Choose your state to automatically find the correct electricity board tariff calculator.
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 flex flex-col gap-4">
          <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
            <PopoverTrigger render={<Button variant="outline" role="combobox" className="w-full justify-between" />}>
              {selectedState ? selectedState.state : "Select state..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0 min-w-[200px]" align="start">
              <Command>
                <CommandInput placeholder="Search state..." />
                <CommandList>
                  <CommandEmpty>No state found.</CommandEmpty>
                  <CommandGroup>
                    {STATE_BOARDS.map((s) => (
                      <CommandItem
                        key={s.slug}
                        value={s.state}
                        onSelect={() => {
                          setSelectedStateSlug(s.slug);
                          setComboboxOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedStateSlug === s.slug ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {s.state}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {selectedState && (
            <div className="bg-primary/5 border border-primary/20 rounded-md p-4 text-sm mt-2 animate-in fade-in slide-in-from-bottom-2">
              <span className="text-muted-foreground block mb-1">Associated Board:</span>
              <span className="font-semibold text-primary text-lg">{selectedState.board}</span>
              <p className="text-muted-foreground mt-2 text-xs">
                Redirecting you to the {selectedState.board} calculator.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleContinue} disabled={!selectedState} className="shadow-md">
            Continue to Calculator
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
