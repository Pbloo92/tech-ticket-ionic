import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal
} from '@angular/core';
import {
  IonBadge,
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { TicketService } from '../../core/services/ticket.service';

type TicketFilter = 'todos' | 'abiertos' | 'cerrados';

@Component({
  selector: 'app-ticket-dashboard',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonSegment,
    IonSegmentButton, IonLabel, IonSpinner, IonText, IonButton,
    IonList, IonItem, IonBadge
  ],
  templateUrl: './ticket-dashboard.component.html',
  styleUrl: './ticket-dashboard.component.scss'
})
export class TicketDashboardComponent implements OnInit {
  readonly ticketService = inject(TicketService);
  readonly filtroActual = signal<TicketFilter>('todos');

  readonly ticketsFiltrados = computed(() => {
    const data = this.ticketService.tickets();
    const filter = this.filtroActual();

    if (filter === 'abiertos') return data.filter(ticket => !ticket.completed);
    if (filter === 'cerrados') return data.filter(ticket => ticket.completed);
    return data;
  });

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.ticketService.fetchTickets();
  }

  cambiarFiltro(event: CustomEvent): void {
    const value = (event.detail as { value?: string }).value;
    if (value === 'todos' || value === 'abiertos' || value === 'cerrados') {
      this.filtroActual.set(value);
    }
  }
}
