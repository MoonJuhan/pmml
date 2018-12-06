<?php
class About extends Controller
{
	public function index()
	{
		$this->intro();
	}
	public function intro()
	{
		require 'application/views/_templates/header.php';
		require 'application/views/about/intro.php';
		require 'application/views/_templates/footer.php';
	}
	public function history()
	{
		require 'application/views/_templates/header.php';
		require 'application/views/about/history.php';
		require 'application/views/_templates/footer.php';
	}
	public function map()
	{
		require 'application/views/_templates/header.php';
		require 'application/views/about/map.php';
		require 'application/views/_templates/footer.php';
	}
}
 ?>
