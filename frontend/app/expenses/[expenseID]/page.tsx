import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Expense() {
  return (
    <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16">
      <div className="prose prose-gray mx-auto max-w-6xl dark:prose-invert">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl lg:leading-[3.5rem] text-center md:text-left">
            Business Trip Expenses
          </h1>
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Button variant="outline" size="sm">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <FilePenIcon className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="grid gap-1">
              <div className="text-sm font-medium text-muted-foreground">
                Amount
              </div>
              <div className="text-2xl font-bold">$1,234.56</div>
            </div>
            <div className="grid gap-1">
              <div className="text-sm font-medium text-muted-foreground">
                Date
              </div>
              <div>June 15, 2023</div>
            </div>
            <div className="grid gap-1">
              <div className="text-sm font-medium text-muted-foreground">
                Category
              </div>
              <div>Travel</div>
            </div>
            <div className="grid gap-1">
              <div className="text-sm font-medium text-muted-foreground">
                Notes
              </div>
              <div>
                Attended the annual sales conference in San Francisco. Stayed at
                the Hilton for 3 nights.
              </div>
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1 space-y-4">
            <div className="grid gap-1">
              <div className="text-sm font-medium text-muted-foreground">
                Receipts
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Image
                  src="/placeholder.svg"
                  alt="Receipt 1"
                  width={200}
                  height={200}
                  className="aspect-square rounded-md object-cover w-full"
                />
                <Image
                  src="/placeholder.svg"
                  alt="Receipt 2"
                  width={200}
                  height={200}
                  className="aspect-square rounded-md object-cover w-full"
                />
                <Image
                  src="/placeholder.svg"
                  alt="Receipt 3"
                  width={200}
                  height={200}
                  className="aspect-square rounded-md object-cover w-full"
                />
              </div>
            </div>
            <div className="grid gap-1">
              <div className="text-sm font-medium text-muted-foreground">
                Attachments
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center gap-2 rounded-md border bg-muted/20 p-4">
                  <FileIcon className="h-8 w-8 text-muted-foreground" />
                  <div className="text-sm font-medium text-center">
                    Expense Report.pdf
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 rounded-md border bg-muted/20 p-4">
                  <FileIcon className="h-8 w-8 text-muted-foreground" />
                  <div className="text-sm font-medium text-center">
                    Itinerary.docx
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DownloadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}
