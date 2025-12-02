"use client";

import {
  Button,
  Card,
  CardContent,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms";

export default function ComponentsShowcase() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Component Showcase</h1>

      <section className="mb-8">
        <h2 className="font-semibold mb-2">Buttons</h2>
        <div className="flex gap-3">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold mb-2">Cards</h2>
        <Card>
          <CardContent>This is a Card content.</CardContent>
        </Card>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold mb-2">Input</h2>
        <Input placeholder="Type here..." />
      </section>

      <section className="mb-8">
        <h2 className="font-semibold mb-2">Tabs</h2>
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">One</TabsTrigger>
            <TabsTrigger value="tab2">Two</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content One</TabsContent>
          <TabsContent value="tab2">Content Two</TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
