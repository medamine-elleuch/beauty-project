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

// Données fictives pour les commandes en attente
const pendingOrders = [
  {
    id: "ORD-001",
    customer: "Jean Dupont",
    date: "2023-05-15",
    total: 129.99,
  },
  {
    id: "ORD-004",
    customer: "Sophie Lefebvre",
    date: "2023-05-12",
    total: 59.99,
  },
  {
    id: "ORD-007",
    customer: "Thomas Petit",
    date: "2023-05-10",
    total: 89.99,
  },
];

export default function PendingOrdersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Commandes en attente
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Liste des commandes en attente</CardTitle>
          <CardDescription>
            Gérez les commandes qui sont en attente de traitement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>€{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                      >
                        Marquer comme expédiée
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
