<?php



try
{
    $bdd = new PDO('mysql:host=localhost;dbname=crazy7;charset=utf8', 'root', '');
}

catch (Exception $e)
{
    die('Erreur : ' . $e->getMessage());
}

$req = $bdd->prepare('SELECT * FROM crazy7 ORDER BY score DESC LIMIT 0,10');
$req->execute();

$results=$req->fetchAll(PDO::FETCH_ASSOC);
$json=json_encode($results);

echo json_encode($json);

/*
while ($donnees = $req->fetch() )
{
  $entres .= "<p\">"  . $donnees['pseudo'] . $donnees['score'] . " date " . $donnees['date'] . "</p>";
  $ps = $donnees['pseudo']
}
*/

$req->closeCursor();
$bdd=null;

?>
