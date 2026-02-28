"use client";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your POS System
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value="Loading..."
          change="+0%"
        />
        <StatCard
          title="Monthly Sales"
          value="₱0.00"
          change="+0%"
        />
        <StatCard
          title="Stock Value"
          value="₱0.00"
          change="+0%"
        />
        <StatCard
          title="Categories"
          value="19"
          change="Complete"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
          <div className="text-muted-foreground text-sm">
            No recent activities
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Today&apos;s Sales</span>
              <span className="font-medium">₱0.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Items Sold Today
              </span>
              <span className="font-medium">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Stock Variance
              </span>
              <span className="font-medium">₱0.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <p className="text-xs text-muted-foreground mt-2">{change}</p>
    </div>
  );
}
