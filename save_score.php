<?php
try
{
    $bdd = new PDO('mysql:host=localhost;dbname=crazy7;charset=utf8', 'root', '');
}

catch (Exception $e)
{
    die('Erreur : ' . $e->getMessage());
}

$score = intval(htmlspecialchars($_GET['score']));
$pseudo = htmlspecialchars($_GET['pseudo']);
$date = date('Y-m-d');

echo '<html><body>';
echo 'Bienvenue!<br />';
echo $score.'<br />';
echo $pseudo.'<br />';
echo $date.'<br />';
echo '</body>';
$bdd->exec("INSERT INTO crazy7 VALUES ('".$pseudo."',".$score.",'".$date."')");

$bdd=null;

?>
