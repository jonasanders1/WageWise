import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTheme } from "@/hooks/useTheme";
import { toast } from "@/hooks/use-toast";
import {
  Paintbrush,
  Moon,
  Sun,
  Monitor,
  Sliders,
  Palette,
  BarChart2,
  User,
} from "lucide-react";
import ColorSelector from "./ColorSelector";
import PreviewBarChart from "@/components/charts/PreviewBarChart";
import { defaultColors } from "@/types/theme";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";
import { useAuth } from "@/context/AuthContext";

const Settings: React.FC = () => {
  const { theme, colors, setTheme, setColors } = useTheme();
  const { user } = useAuth();
  const [localColors, setLocalColors] = useState(colors);
  const [activeTab, setActiveTab] = useState("appearance");
  const handleSave = () => {
    setColors(localColors);
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    });
  };

  const resetColors = () => {
    setLocalColors({
      regularPay: defaultColors.regularPay,
      overtimePay: defaultColors.overtimePay,
      bonusPay: defaultColors.bonusPay,
      hoursWorked: defaultColors.hoursWorked,
    });
  };

  const previewData = [
    {
      name: "Example",
      regularPay: 2000,
      overtimePay: 800,
      bonusPay: 500,
    },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your application preferences and appearance.
          </p>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <Paintbrush size={16} />
            <span>Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Sliders size={16} />
            <span>Preferences</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User size={16} />
            <span>Account</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon size={18} />
                Theme
              </CardTitle>
              <CardDescription>
                Choose your preferred color theme for the application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    className="w-full"
                    onClick={() => setTheme("system")}
                  >
                    <Monitor className="mr-2 h-4 w-4" />
                    System
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette size={18} />
                Color Customization
              </CardTitle>
              <CardDescription>
                Customize the colors used for different types of income.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="grid grid-cols-2 gap-x-8 gap-y-2 w-fit">
                  <div className="flex items-center gap-2">
                    <ColorSelector
                      id="regularColor"
                      color={localColors.regularPay}
                      onChange={(value) =>
                        setLocalColors((prev) => ({
                          ...prev,
                          regularPay: value,
                        }))
                      }
                    />
                    <Label htmlFor="regularColor" className="text-sm">
                      Regular Pay
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <ColorSelector
                      id="overtimeColor"
                      color={localColors.overtimePay}
                      onChange={(value) =>
                        setLocalColors((prev) => ({
                          ...prev,
                          overtimePay: value,
                        }))
                      }
                    />
                    <Label htmlFor="overtimeColor" className="text-sm">
                      Overtime Pay
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <ColorSelector
                      id="bonusColor"
                      color={localColors.bonusPay}
                      onChange={(value) =>
                        setLocalColors((prev) => ({
                          ...prev,
                          bonusPay: value,
                        }))
                      }
                    />
                    <Label htmlFor="bonusColor" className="text-sm">
                      Bonus Pay
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <ColorSelector
                      id="hoursColor"
                      color={localColors.hoursWorked}
                      onChange={(value) =>
                        setLocalColors((prev) => ({
                          ...prev,
                          hoursWorked: value,
                        }))
                      }
                    />
                    <Label htmlFor="hoursColor" className="text-sm">
                      Hours Worked
                    </Label>
                  </div>
                </div>

                <div className="hidden lg:block border rounded-lg p-4 bg-card ">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <BarChart2 size={16} />
                      Chart Preview
                    </div>
                  </div>

                  <PreviewBarChart colors={localColors} />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button variant="outline" onClick={resetColors}>
                  Reset to Defaults
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Default Values</CardTitle>
              <CardDescription>
                Configure default values for new entries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="defaultPayRate">Default Pay Rate ($)</Label>
                  <Input
                    id="defaultPayRate"
                    type="number"
                    placeholder="$30"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultOvertimeRate">
                    Default Overtime Rate ($)
                  </Label>
                  <Input
                    id="defaultOvertimeRate"
                    type="number"
                    placeholder="$16"
                    className="h-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    className="h-10"
                    value={user?.email || ""}
                    disabled
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button
                  variant="destructive"
                  onClick={async () => {
                    try {
                      await signOut(auth);
                      toast({
                        title: "Logged out successfully",
                        description: "You have been logged out.",
                      });
                    } catch (error) {
                      toast({
                        title: "Failed to log out",
                        description: "Please try again.",
                      });
                    }
                  }}
                >
                  Log Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
