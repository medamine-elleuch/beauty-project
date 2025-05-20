import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";

// Données fictives pour les méthodes de livraison
const shippingMethods = [
  {
    id: "ship-001",
    name: "Livraison standard",
    price: 4.99,
    estimatedDays: "3-5",
    active: true,
  },
  {
    id: "ship-002",
    name: "Livraison express",
    price: 9.99,
    estimatedDays: "1-2",
    active: true,
  },
  {
    id: "ship-003",
    name: "Livraison gratuite",
    price: 0,
    estimatedDays: "5-7",
    active: true,
    minOrderValue: 50,
  },
];

export default function ShippingSettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">
          Paramètres de livraison
        </h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Options de livraison</CardTitle>
          <CardDescription>
            Configurez les options de livraison disponibles pour vos clients.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="free-shipping">Livraison gratuite</Label>
              <p className="text-sm text-muted-foreground">
                Offrir la livraison gratuite pour les commandes dépassant un
                certain montant.
              </p>
            </div>
            <Switch id="free-shipping" defaultChecked />
          </div>
          <div className="space-y-2">
            <Label htmlFor="free-shipping-threshold">
              Seuil de livraison gratuite (€)
            </Label>
            <Input
              id="free-shipping-threshold"
              type="number"
              defaultValue="50"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="local-pickup">Retrait en magasin</Label>
              <p className="text-sm text-muted-foreground">
                Permettre aux clients de retirer leurs commandes en magasin.
              </p>
            </div>
            <Switch id="local-pickup" defaultChecked />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Enregistrer les modifications</Button>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Méthodes de livraison</CardTitle>
            <CardDescription>
              Gérez les méthodes de livraison disponibles pour vos clients.
            </CardDescription>
          </div>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une méthode
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Délai estimé (jours)</TableHead>
                <TableHead>Minimum de commande</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shippingMethods.map((method) => (
                <TableRow key={method.id}>
                  <TableCell className="font-medium">{method.name}</TableCell>
                  <TableCell>€{method.price.toFixed(2)}</TableCell>
                  <TableCell>{method.estimatedDays}</TableCell>
                  <TableCell>
                    {method.minOrderValue ? `€${method.minOrderValue}` : "-"}
                  </TableCell>
                  <TableCell>
                    <Switch checked={method.active} />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
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
