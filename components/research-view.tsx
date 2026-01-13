"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, FileText, ExternalLink } from "lucide-react";
import { createResearchDocument } from "@/lib/actions";
import { toast } from "sonner";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function ResearchView({ documents = [] }: { documents: any[] }) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        await createResearchDocument(formData);
        toast.success("Research document added successfully!");
        setIsOpen(false);
      } catch (error) {
        toast.error("Failed to add document.");
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add Resource
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Research Document</SheetTitle>
              <SheetDescription>
                Add a new legal resource to the database.
              </SheetDescription>
            </SheetHeader>
            <form action={handleSubmit} className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" required placeholder="e.g. Constitutional Law Review" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Input id="type" name="type" required placeholder="e.g. Case Law, Article" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="source">Source/Citation</Label>
                <Input id="source" name="source" required placeholder="e.g. Supreme Court, 2024" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url">External Link (Optional)</Label>
                <Input id="url" name="url" placeholder="https://..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea id="summary" name="summary" required placeholder="Brief summary of the document..." />
              </div>
              <SheetFooter>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Adding..." : "Add Document"}
                </Button>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Source</TableHead>
              <TableHead className="hidden lg:table-cell">Summary</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                        No documents found.
                    </TableCell>
                </TableRow>
            ) : (
                filteredDocuments.map((doc) => (
                <TableRow key={doc._id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-primary" />
                            {doc.title}
                        </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">{doc.type}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{doc.source}</TableCell>
                    <TableCell className="hidden lg:table-cell max-w-xs truncate" title={doc.summary}>
                        {doc.summary}
                    </TableCell>
                    <TableCell className="text-right">
                        {doc.url && (
                            <Link href={doc.url} target="_blank" className="inline-flex items-center justify-center p-2 rounded-md hover:bg-muted">
                                <ExternalLink className="h-4 w-4" />
                            </Link>
                        )}
                    </TableCell>
                </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
