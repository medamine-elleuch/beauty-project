import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analyses</h2>
      </div>
      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales">Ventes</TabsTrigger>
          <TabsTrigger value="traffic">Trafic</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="customers">Clients</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventes aujourd'hui</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€1,231.89</div>
                <p className="text-xs text-muted-foreground">+10.1% par rapport à hier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventes cette semaine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€8,350.00</div>
                <p className="text-xs text-muted-foreground">+5.1% par rapport à la semaine dernière</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventes ce mois</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€32,234.00</div>
                <p className="text-xs text-muted-foreground">+19.5% par rapport au mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ventes cette année</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€245,573.00</div>
                <p className="text-xs text-muted-foreground">+24.4% par rapport à l'année dernière</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Tendance des ventes</CardTitle>
                <CardDescription>Évolution des ventes sur les 30 derniers jours</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Graphique des ventes</p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Meilleures ventes par catégorie</CardTitle>
                <CardDescription>Répartition des ventes par catégorie de produits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted/20 rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Graphique des catégories</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
