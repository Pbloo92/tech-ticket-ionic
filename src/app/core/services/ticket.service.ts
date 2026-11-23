import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Ticket {
  id: number;
  title: string;
  completed: boolean;
}

interface TicketState {
  data: Ticket[];
  loading: boolean;
  error: string | null;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private readonly http = inject(HttpClient);

  // Estado mutable privado: solo este servicio puede modificarlo.
  private readonly state = signal<TicketState>({
    data: [],
    loading: false,
    error: null
  });

  // Estado público de solo lectura.
  readonly tickets = computed(() => this.state().data);
  readonly isLoading = computed(() => this.state().loading);
  readonly errorMessage = computed(() => this.state().error);

  fetchTickets(): void {
    this.state.update(current => ({
      ...current,
      loading: true,
      error: null
    }));

    this.http.get<Ticket[]>('https://jsonplaceholder.typicode.com/todos?_limit=15')
      .subscribe({
        next: response => {
          this.state.update(current => ({
            ...current,
            data: response,
            loading: false,
            error: null
          }));
        },
        error: error => {
          console.error('Error al consultar tickets:', error);
          this.state.update(current => ({
            ...current,
            loading: false,
            error: 'Error de red al contactar con el servidor. Revise su conexión.'
          }));
        }
      });
  }
}
