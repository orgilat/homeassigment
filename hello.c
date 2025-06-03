#include <mpi.h>
#include <stdio.h>

int main(int argc, char** argv) {
    MPI_Init(NULL, NULL);

    int world_size;
    MPI_Comm_size(MPI_COMM_WORLD, &world_size);

    int world_rank;
    MPI_Comm_rank(MPI_COMM_WORLD, &world_rank);

    char filename[100];
    sprintf(filename, "/results/output_%d.txt", world_rank);

    FILE* f = fopen(filename, "w");
    if (f == NULL) {
        printf("Failed to open file\n");
    } else {
        fprintf(f, "Hello from process %d out of %d\n", world_rank, world_size);
        fclose(f);
    }

    MPI_Finalize();
    return 0;
}
