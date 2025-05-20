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
import { Badge } from "@/components/ui/badge";

// Données fictives pour les clients
const customers = [
  {
    id: "CUST-001",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    orders: 5,
    totalSpent: 529.95,
    status: "active",
  },
  {
    id: "CUST-002",
    name: "Marie Martin",
    email: "marie.martin@example.com",
    orders: 3,
    totalSpent: 279.5,
    status: "active",
  },
  {
    id: "CUST-003",
    name: "Pierre Durand",
    email: "pierre.durand@example.com",
    orders: 7,
    totalSpent: 849.93,
    status: "active",
  },
  {
    id: "CUST-004",
    name: "Sophie Lefebvre",
    email: "sophie.lefebvre@example.com",
    orders: 2,
    totalSpent: 159.98,
    status: "inactive",
  },
  {
    id: "CUST-005",
    name: "Lucas Bernard",
    email: "lucas.bernard@example.com",
    orders: 4,
    totalSpent: 399.96,
    status: "active",
  },
];

// Fonction pour obtenir la couleur du badge en fonction du statut
const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 hover:bg-green-100"
        >
          Actif
        </Badge>
      );
    case "inactive":
      return (
        <Badge
          variant="outline"
          className="bg-gray-100 text-gray-800 hover:bg-gray-100"
        >
          Inactif
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default function CustomersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Clients</h2>
        <div className="flex items-center space-x-2">
          <Button>Exporter</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Liste des clients</CardTitle>
          <CardDescription>
            Gérez vos clients et consultez leurs informations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Commandes</TableHead>
                <TableHead>Total dépensé</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>€{customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Voir
                      </Button>
                      <Button variant="outline" size="sm">
                        Modifier
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
