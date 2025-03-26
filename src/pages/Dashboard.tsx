import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIncome } from "@/context/IncomeContext";
import {
  getMonthlySummaries,
  getYearlySummaries,
  getProjectSummaries,
} from "@/utils/incomeCalculator";
import IncomeEntryForm from "@/components/IncomeEntryForm";
import BonusEntryForm from "@/components/BonusEntryForm";
import IncomeTable from "@/components/IncomeTable";
import BonusTable from "@/components/BonusTable";
import Stats from "@/components/Stats";
import AnnualBarChart from "@/components/charts/AnnualBarChart";
import MonthlyBarChart from "@/components/charts/MonthlyBarChart";
import HoursBarChart from "@/components/charts/HoursBarChart";
import ProjectBarChart from "@/components/charts/ProjectBarChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BarChart4, CalendarIcon, BarChart2, PieChart } from "lucide-react";
import Settings from "@/components/Settings";
import logo from "@/assets/logo.png";

const Dashboard: React.FC = () => {
  const { entries, bonuses, loading } = useIncome();
  const [activeTab, setActiveTab] = useState("data");
  const [activeDataTab, setActiveDataTab] = useState("income");

  // Process data for charts
  const monthlySummaries = getMonthlySummaries(entries, bonuses);
  const yearlySummaries = getYearlySummaries(entries, bonuses);
  const projectSummaries = getProjectSummaries(entries, bonuses);

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-7xl space-y-8">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold">WageWise</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl space-y-8 animate-fade-in">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold">WageWise</h1>
          <img src={logo} alt="WageWise" className="w-8 h-8" />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-3 mx-auto mb-4">
            <TabsTrigger value="data">Data Entry</TabsTrigger>
            <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="data">
            <div className="page-transition-item">
              <Stats />
            </div>

            <Tabs
              value={activeDataTab}
              onValueChange={setActiveDataTab}
              className="w-full mt-6"
            >
              <TabsList className="w-full md:w-auto mx-auto">
                <TabsTrigger value="income">Income Entries</TabsTrigger>
                <TabsTrigger value="bonuses">Bonuses</TabsTrigger>
              </TabsList>

              <TabsContent value="income" className="mt-4">
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                  <div className="xl:col-span-2">
                    <IncomeEntryForm />
                  </div>
                  <div className="xl:col-span-3">
                    <IncomeTable />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bonuses" className="mt-4">
                <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                  <div className="xl:col-span-2">
                    <BonusEntryForm />
                  </div>
                  <div className="xl:col-span-3">
                    <BonusTable />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="visualizations">
            <div className="page-transition-item">
              <Stats />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <Card className="glass">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-xl flex items-center">
                      <BarChart4 size={20} className="mr-2 text-primary" />
                      Monthly Earnings
                    </CardTitle>
                    <CardDescription>
                      Regular, overtime & bonus pay by month
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {monthlySummaries.length > 0 ? (
                    <MonthlyBarChart data={monthlySummaries} />
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      No monthly data available yet
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-xl flex items-center">
                      <BarChart2 size={20} className="mr-2 text-primary" />
                      Annual Earnings
                    </CardTitle>
                    <CardDescription>
                      Regular, overtime & bonus pay by year
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {yearlySummaries.length > 0 ? (
                    <AnnualBarChart data={yearlySummaries} />
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      No yearly data available yet
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-xl flex items-center">
                      <CalendarIcon size={20} className="mr-2 text-primary" />
                      Hours Worked
                    </CardTitle>
                    <CardDescription>
                      Total hours worked per month
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {monthlySummaries.length > 0 ? (
                    <HoursBarChart data={monthlySummaries} />
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      No monthly data available yet
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-xl flex items-center">
                      <PieChart size={20} className="mr-2 text-primary" />
                      Project Earnings
                    </CardTitle>
                    <CardDescription>
                      Income breakdown by project
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  {projectSummaries.length > 0 ? (
                    <ProjectBarChart data={projectSummaries} />
                  ) : (
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                      No project data available yet
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <div className="page-transition-item">
              <Settings />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
