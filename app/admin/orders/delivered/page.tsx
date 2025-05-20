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

// Données fictives pour les commandes livrées
const deliveredOrders = [
  {
    id: "ORD-003",
    customer: "Pierre Durand",
    date: "2023-05-13",
    deliveryDate: "2023-05-16",
    total: 249.99,
  },
  {
    id: "ORD-006",
    customer: "Julie Moreau",
    date: "2023-05-10",
    deliveryDate: "2023-05-14",
    total: 99.99,
  },
  {
    id: "ORD-009",
    customer: "Antoine Leroy",
    date: "2023-05-08",
    deliveryDate: "2023-05-12",
    total: 179.99,
  },
];

export default function DeliveredOrdersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Commandes livrées</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Liste des commandes livrées</CardTitle>
          <CardDescription>
            Consultez les commandes qui ont été livrées avec succès.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date de commande</TableHead>
                <TableHead>Date de livraison</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell>€{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                      <Button variant="outline" size="sm">
                        Archiver
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
