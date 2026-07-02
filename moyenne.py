

s = 0           
somme_coef = 0  


n = int(input("Entrer le nombre de matières: "))
print(f"Donc vous avez {n} matière(s)")

for i in range(n):
    print(f"\n--- Matière {i+1} ---")
    
   
    x = float(input("Entrer votre note: "))
    while x > 20 or x < 0:
        print("Erreur: la note doit être entre 0 et 20. Réessayez.")
        x = float(input("Entrer votre note: "))
    
   
    y = float(input("Entrer le coefficient: "))
    while y <= 0:
        print("Erreur: le coefficient doit être positif. Réessayez.")
        y = float(input("Entrer le coefficient: "))
    
    s = s + x * y
    somme_coef = somme_coef + y

print(f"\nLa somme pondérée de vos notes est: {s}")
m = s / somme_coef
print(f"La moyenne de vos notes est: {m:.2f}")  