# Calculate weighted average (moyenne pondérée)

s = 0           # Weighted sum of grades
somme_coef = 0  # Sum of coefficients

# Get number of grades to enter
n = int(input("Entrer le nombre de matières: "))
print(f"Donc vous avez {n} matière(s)")

for i in range(n):
    print(f"\n--- Matière {i+1} ---")
    
    # Input and validate grade (0-20)
    x = float(input("Entrer votre note: "))
    while x > 20 or x < 0:
        print("Erreur: la note doit être entre 0 et 20. Réessayez.")
        x = float(input("Entrer votre note: "))
    
    # Input and validate coefficient (must be positive)
    y = float(input("Entrer le coefficient: "))
    while y <= 0:
        print("Erreur: le coefficient doit être positif. Réessayez.")
        y = float(input("Entrer le coefficient: "))
    
    s = s + x * y
    somme_coef = somme_coef + y

print(f"\nLa somme pondérée de vos notes est: {s}")
m = s / somme_coef
print(f"La moyenne de vos notes est: {m:.2f}")  # Rounded to 2 decimals