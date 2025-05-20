import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Données fictives pour les commandes expédiées
const shippedOrders = [
  {
    id: "ORD-002",
    customer: "Marie Martin",
    date: "2023-05-14",
    trackingNumber: "TRK123456789",
    total: 79.5,
  },
  {
    id: "ORD-005",
    customer: "Lucas Bernard",
    date: "2023-05-11",
    trackingNumber: "TRK987654321",
    total: 149.99,
  },
  {
    id: "ORD-008",
    customer: "Emma Dubois",
    date: "2023-05-09",
    trackingNumber: "TRK456789123",
    total: 199.99,
  },
];

export default function ShippedOrdersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Commandes expédiées
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Liste des commandes expédiées</CardTitle>
          <CardDescription>
            Suivez les commandes qui ont été expédiées.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Numéro de suivi</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shippedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.trackingNumber}</TableCell>
                  <TableCell>€{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-green-50 text-green-700 hover:bg-green-100"
                      >
                        Marquer comme livrée
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
