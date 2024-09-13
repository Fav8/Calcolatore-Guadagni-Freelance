'use client'

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Component for the first tab
const FirstTabContent = () => (
  <div className="p-4 bg-primary/10 rounded-lg">
    <h2 className="text-2xl font-bold mb-2">First Tab Content</h2>
    <p>This is the content for the first tab. You can add any components or information here.</p>
  </div>
)

// Component for the second tab
const SecondTabContent = () => (
  <div className="p-4 bg-secondary/10 rounded-lg">
    <h2 className="text-2xl font-bold mb-2">Second Tab Content</h2>
    <ul className="list-disc list-inside">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
  </div>
)

// Component for the third tab
const ThirdTabContent = () => (
  <div className="p-4 bg-accent/10 rounded-lg">
    <h2 className="text-2xl font-bold mb-2">Third Tab Content</h2>
    <div className="flex justify-center items-center h-40">
      <div className="w-20 h-20 bg-accent rounded-full animate-pulse"></div>
    </div>
  </div>
)

export function TabSelector() {
  const [activeTab, setActiveTab] = useState("tab1")

  const getValueForTab = (tab: string) => {
    switch (tab) {
      case "tab1":
        return 3000
      case "tab2":
        return 5000
      case "tab3":
        return 7000
      default:
        return 0
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <FirstTabContent />
        </TabsContent>
        <TabsContent value="tab2">
          <SecondTabContent />
        </TabsContent>
        <TabsContent value="tab3">
          <ThirdTabContent />
        </TabsContent>
      </Tabs>
      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Calculated Value:</h3>
        <p className="text-4xl font-bold">€{getValueForTab(activeTab).toFixed(2)}</p>
      </div>
    </div>
  )
}